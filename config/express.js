const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const path = require('path');
const auth = require('../middlewares/auth');

module.exports = (app) => {

    // Setup helpers
    var hbs = handlebars.create({
        helpers: {
            select: function (selected, options) {
                    return options.fn(this).replace(
                        new RegExp(' value=\"' + selected + '\"'),
                        '$& selected="selected"');
                },
        },
        extname: '.hbs',
    });

    // Setup the view engine
    app.engine('hbs', hbs.engine);
    app.set('view engine', '.hbs');

    // Setup the body parser
    app.use(cookieParser());
    app.use(express.json())
    app.use(express.urlencoded({ extended: true, }));
    app.use(auth);

    // Setup the static files
    const staticFilePath = path.join(__dirname,'..', 'static');
    app.use('/static', express.static(staticFilePath));
};
