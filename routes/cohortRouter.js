const { response } = require("express");
const express = require("express");
const knex = require("../client");
const router = express.Router();

router.get('/', (request, response) => {
    knex('cohorts').orderBy('createdAt', 'desc')
    .then(cohorts => {
        response.render('cohorts', {cohorts: cohorts});
    });
});

router.get('/new', (request, response) => {
    response.render('new');
});

router.post('/', (request, response) => {
    knex('cohorts').insert({
        imageUrl: request.body.imageUrl,
        name: request.body.name,
        members: request.body.members
    }).returning('*').then(cohorts => {
        response.redirect(`/cohorts/${cohorts[0].id}`);
    });
});

router.get('/:id', (request, response) => {
    knex('cohorts').where('id', request.params.id).first()
    .then(cohorts => {
        if (cohorts) {
            let members = cohorts.members.split(',');
            // members.forEach(element => {
            //     element = element.replaceAll("[\\r\\n]+", '');
            // }) ask the TAs about this
            // console.log(members);
            const method = request.query.method;
            const quantity = parseInt(request.query.quantity);
            const count = Math.ceil(members.length/quantity);
            let result;
            if (method == 'teamCount') {
                result = [];
                for (let i = 0; i < quantity; i++) {
                    result[i] = [];
                    for (let j = (i*count); j < (i*count)+count; j++) {
                        if (members[j]) {
                            result[i].push(members[j]);
                        }
                    }
                }
            } else if (method == 'perTeam') {
                result = [];
                for (let i = 0; i < count; i++) {
                    result[i] = [];
                    for (let j = (i*quantity); j < (i*quantity)+quantity; j++) {
                        if (members[j]) {
                            result[i].push(members[j]);
                        }
                    }
                }
            }
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
    knex('cohorts').where('id', request.params.id).first()
    .update({
        imageUrl: request.body.imageUrl,
        name: request.body.name,
        members: request.body.members
    }).then(() => {
        response.redirect(`/cohorts/${request.params.id}`);
    });
});

module.exports = router;