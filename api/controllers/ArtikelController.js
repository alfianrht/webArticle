/**
 * ArtikelController
 *
 * @description :: Server-side logic for managing artikels
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	daftar: function(req, res){
        // res.view('daftar');
        Artikel.find({}).exec(function(err, artikel){
            if(err){
                res.send(500, {error: 'Database anda mengalami error'});
            }
            res.view('daftar', {artikel:artikel});
        });
    },
    tambah: function(req, res){
        res.view('tambah');
    },
    buat: function(req, res){
        var title = req.body.title;
        var body = req.body.body;

        // if(!title || !body){
        //     res.redirect('/artikel/tambah');
        // }
        Artikel.create({title:title, body:body}).exec(function(err){
            if(err){
                res.send(500, {error: 'Database anda bermasalah'});
            }
            res.redirect('/artikel/daftar');
        });
    },

    hapus: function(req, res){
        Artikel.destroy({id:req.params.id}).exec(function(err){
            if(err){
                res.send(500, {error: 'Database anda bermasalah'});
            }
            res.redirect('/artikel/daftar');
        });
        return false;
    },

    edit: function(req, res){
        Artikel.findOne({id:req.params.id}).exec(function(err, artikel){
            if(err){
                res.send(500, {error: 'Database anda bermasalah'});
            }

            res.view('edit', {artikel:artikel});
        });
    },

    update: function(req, res){
        var title = req.body.title;
        var body = req.body.body;

        // if(!title || !body){
        //     res.redirect('/artikel/tambah');
        // }
        Artikel.update({id: req.params.id}, {title:title, body:body}).exec(function(err){
            if(err){
                res.send(500, {error: 'Database anda bermasalah'});
            }
            res.redirect('/artikel/daftar');
        });

        return false;
    }
};

