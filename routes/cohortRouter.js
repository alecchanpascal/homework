//Calling the various required modules for express, knex, router and the membersFix
const { response } = require("express");
const express = require("express");
const knex = require("../client");
const router = express.Router();
const fix = require('./membersFix');

//GET method for the base '/cohorts' page with a search bar to find cohort by name
router.get('/', (request, response) => {
    if (!request.query.name) {
        knex('cohorts').orderBy('createdAt', 'desc')
        .then(cohorts => {
            response.render('cohorts', {cohorts: cohorts});
        });
    } else {
        knex('cohorts').where('name', 'ilike', request.query.name).first()
        .then(cohorts => {
            if (cohorts) {
                response.redirect(`/cohorts/${cohorts.id}`);
            } else {
                response.render('notFound');
            }
        });
    }
});

//GET method for the '/cohorts/new' page
router.get('/new', (request, response) => {
    response.render('new');
});

//POST method for the '/cohorts' page from the '/cohorts/new' page
router.post('/', (request, response) => {
    //Makes sure the fields are populated, otherwise reloads the page
    if (request.body.members && request.body.name && request.body.imageUrl) {
        //Calls on a fix function from membersFix.js to solve any newline/empty space problems in the members list
        let members = fix.fix(request.body.members)
        knex('cohorts').insert({
            imageUrl: request.body.imageUrl,
            name: request.body.name,
            members: members.toString()
        }).returning('*').then(cohorts => {
            response.redirect(`/cohorts/${cohorts[0].id}`);
        });
    } else {
        response.redirect('/cohorts/new');
    }
});

//GET method for a specific cohort given the id
router.get('/:id', (request, response) => {
    knex('cohorts').where('id', request.params.id).first()
    .then(cohorts => {
        if (cohorts) {
            let members = cohorts.members.split(',');
            const method = request.query.method;
            const quantity = parseInt(request.query.quantity);
            //Calls a method from membersFix.js to determine the team assignment given the user's choices
            let result = fix.assignment(members, method, quantity);
            response.render('show', {
                cohorts: cohorts,
                result: result
            });
        } else {
            response.render('notFound');
        }
    });
});

//DELETE method to delete a specific cohort
router.delete('/:id', (request, response) => {
    knex('cohorts').where('id', request.params.id).first()
    .del().then(() => {
        response.redirect('/cohorts');
    });
});

//GET method to get the edit page of a specific cohort
router.get('/:id/edit', (request, response) => {
    knex('cohorts').where('id', request.params.id).first()
    .then(cohorts => {
        response.render('edit', {cohorts: cohorts});
    });
});

//PATCH method to update a given cohort given the information from the edit page
router.patch('/:id', (request, response) => {
    //Makes sure all fields are populated, otherwise it reloads the page
    if (request.body.members && request.body.name && request.body.imageUrl) {
        //Calls on the fix method from membersFix.js to take care of newline/empty characters
        let members = fix.fix(request.body.members);
        knex('cohorts').where('id', request.params.id).first()
        .update({
            imageUrl: request.body.imageUrl,
            name: request.body.name,
            members: members.toString()
        }).then(() => {
            response.redirect(`/cohorts/${request.params.id}`);
        });
    } else {
        response.redirect(`/cohorts/${request.params.id}/edit`);
    }
});

//Export for use in index.js
module.exports = router;