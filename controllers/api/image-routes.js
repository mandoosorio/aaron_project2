const router = require('express').Router();
var multer  = require('multer');
var imageMiddleware= require('../../middlewares/store-image');
const { ScoreCard } = require('../../models');
//const imageController= require('../controllers/image-controller');

//router.post('/store-image',imageController.storeImage)
router.post('/store-image', async(req, res) => {
    //console.log(req);
    var imgInfo;

    var upload = await multer({
        storage: imageMiddleware.image.storage(), 
        allowedImage:imageMiddleware.image.allowedImage 
    }).single('image');

    await upload(req, res, function (err) {
        console.log(req.file.originalname);
        imgInfo = req.file.originalname;
        var body = {
            scoreImage: req.file.originalname
        }
        if(req.file.originalname){
            res.render('imageUpload');
            const [affectedRows] = ScoreCard.update(body, {
                where: {
                id: "1",
                },
            });

            if (affectedRows > 0) {
                res.status(200).end();
      
            } else {
                res.status(404).end();
            }
        }



        if (err instanceof multer.MulterError) {
            res.send(err);
        } else if (err) {
            res.send(err);
        }else{
        // store image in database
            var imageName = req.file.originalname;
            var inputValues = {
                score_image: imageName
            }
            // call model
            // ScoreCard.storeImage(inputValues, function(data){
            //     res.render('upload-form',{alertMsg:data})
            // })

            // ScoreCard.update(inputValues, {
            //     where: {
            //       id: req.params.id,
            //     },
            // });
    
            // if (affectedRows > 0) {
            //   res.status(200).end();
            // } else {
            //   res.status(404).end();
            // }
    
        }

    })
    console.log("bodyyy", imgInfo);
    const [affectedRows] = await ScoreCard.update(imgInfo, {
                where: {
                id: "1",
                },
            });

            if (affectedRows > 0) {
                //res.status(200).end();
                console.log("good");
            } else {
                console.log("bad");
            }
})


module.exports = router;