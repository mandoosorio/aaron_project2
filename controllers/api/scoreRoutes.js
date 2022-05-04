const router = require('express').Router();
const { Golfer, ScoreCard } = require('../../models');
var multer  = require('multer');
var imageMiddleware= require('../../middlewares/store-image');

router.get('/', async (req, res) => {
    try {
        const scoreData = await ScoreCard.findAll({
            include: [{ model: Golfer}]
        });
        res.status(200).json(scoreData);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});

router.put("/upload/:id", async(req, res) => {
    try {
        const [affectedRows] = await ScoreCard.update(req.body, {
            where: {
              id: req.params.id,
            },
        });

        var upload = multer({
            storage: imageMiddleware.image.storage(), 
            allowedImage:imageMiddleware.image.allowedImage 
          }).single('image');
        
            upload(req, res, function (err) {
                if (err instanceof multer.MulterError) {
                    res.send(err);
                } else if (err) {
                    res.send(err);
                } else{
                // store image in database
               
                    var imageName = req.file.originalname;
                    var inputValues = {
                        score_image: imageName
                    }
                }
            })
            //window.location("/upload");
        if (affectedRows > 0) {
          res.status(200).end();

        } else {
          res.status(404).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router;