//Calling the various required modules
const { response } = require("express");
const express = require("express");
const knex = require("../client");
const router = express.Router();
const fix = require('./membersFix');

//GET method for the base /cohorts page
router.get('/', (request, response) => {
    knex('cohorts').orderBy('createdAt', 'desc')
    .then(cohorts => {
        response.render('cohorts', {cohorts: cohorts});
    });
});

//GET method for the /cohorts/new page
router.get('/new', (request, response) => {
    response.render('new');
});

//POST method for the /cohorts page from the /cohorts/new page
router.post('/', (request, response) => {
    //Calls on a fix function from membersFix.js to solve any newline/empty space problems in the members list
    let members = fix.fix(request.body.members)
    knex('cohorts').insert({
        imageUrl: request.body.imageUrl,
        name: request.body.name,
        members: members.toString()
    }).returning('*').then(cohorts => {
        response.redirect(`/cohorts/${cohorts[0].id}`);
    });
});

//GET method for a specific cohort given the id
router.get('/:id', (request, response) => {
    knex('cohorts').where('id', request.params.id).first()
    .then(cohorts => {
        if (cohorts) {
            let members = cohorts.members.split(',');
            const method = request.query.method;
            const quantity = parseInt(request.query.quantity);
            const count = Math.ceil(members.length/quantity);
            let result = fix.assignment(members, method, quantity, count);
            response.render('show', {
                cohorts: cohorts,
                result: result
            });
        } else {
            response.send('Error [Cohort No Cohort]: Cohort Not Found');
        }
    });
});

router.delete('/:id', (request, response) => {
    knex('cohorts').where('id', request.params.id).first()
    .del().then(() => {
        response.redirect('/cohorts');
    });
});

router.get('/:id/edit', (request, response) => {
    knex('cohorts').where('id', request.params.id).first()
    .then(cohorts => {
        response.render('edit', {cohorts: cohorts});
    });
});

router.patch('/:id', (request, response) => {
    let members = fix.fix(request.body.members);
    knex('cohorts').where('id', request.params.id).first()
    .update({
        imageUrl: request.body.imageUrl,
        name: request.body.name,
        members: members.toString()
    }).then(() => {
        response.redirect(`/cohorts/${request.params.id}`);
    });
});

module.exports = router;