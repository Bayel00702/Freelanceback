import ResponsesModel from "../models/responses.js";


export const getAllResponse = async (req, res) => {
    try {

        let responses = await ResponsesModel.find()

        if (req.query.orderId) {
            responses = responses.filter(item => item.orderId === req.query.orderId)
        }
        if (req.query.creatorId) {
            responses = responses.filter(item => item.creatorId === req.query.creatorId)
        }



        res.json(responses)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось получить отклики'
        })
    }
}

export const addResponse = async (req, res) => {
    try {

        const doc = new ResponsesModel(req.body)

        await doc.save()

        res.json({
            message: "Отклик добавлен",
            status: "success"
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось изменить заказ'
        })
    }
}