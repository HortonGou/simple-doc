var express = require('express');
var router = express.Router();
const docUtil =require('../utils/docUtil')
/* GET users listing. */
router.get('/', function (req, res, next) {
    docUtil.getFolders().then(result=>{
        res.json(result);
    })

});

router.get('/:folderName', function (req, res, next) {
    docUtil
        .getApiList(req.params.folderName)
        .then(list=>{
            res.json(list)
        })
});

module.exports = router;