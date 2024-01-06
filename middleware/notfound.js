const notfound = (req, res) =>res.status(404).json(
{
    "msg":'The url u r trying to reach not exists please check again and try!!!',
    "statusCode":400,
    "success":false
}
    )
module.exports = notfound