const express = require('express');
const router = express.Router();
const News = require('../models/news');


/* GET home page. */
router.get('/', (req, res) => {
    // to co znajduje się w query stringu np z zapytania naszej wyszukiwarki
    // jest pod req.query
    // dlatego odwołujesz się do req.query.search
    const search = req.query.search;
    const findNews = News
        // szukasz po title a co to podajesz search z consta powyżej
        // RegExp to klasa z mongoose służy do usprawniania wyszukiwania. Pozwala np aby wyszukiwanie było case insensitive
        .find({
            title: new RegExp(search, 'i')
        })
        // specjalna metoda do sortowania
        // -1 malejąco 1 rosnąco
        .sort({
            created: -1
        });

    findNews.exec((err, data) => {
        res.render('news', {
            title: 'News',
            data,
            search
        });
    })

});

module.exports = router;