const { response } = require("express");
const express = require("express");
const knex = require("../client");
const router = express.Router();

router.get('/', (request, response) => {
    knex('cohorts').orderBy('createdAt', 'desc')
    .then(cohorts => {
        response.render('cohort', {cohorts: cohorts});
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
            response.render('show', {cohorts: cohorts});
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
    }).then(cohorts => {
        response.redirect(`/cohorts/${cohorts.id}`);
    });
});

module.exports = router;