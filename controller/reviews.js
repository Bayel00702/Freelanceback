import ReviewsModel from '../models/review.js'

export const addReview = async (req, res) => {
    try {

        const doc = new ReviewsModel(req.body)

        await doc.save()

        res.json({
            message: 'Отзыв добавлен',
            status: 'success'
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось добавить отзыв'
        })
    }
}


export const getAllReviews = async (req,res) => {
    try {
        let reviews ;
        if(req.query.mygetreviews) {
            reviews = await ReviewsModel.find({
                userId: req.query.mygetreviews
            })
        } else if (req.query.mycreatereviews) {
            reviews = await ReviewsModel.find({
                creatorId: req.query.mycreatereviews
            })
        } else {
            reviews = await ReviewsModel.find()
        }

        res.json(reviews)

    } catch (err){
        console.log(err)
        res.status(500).json({
            message: 'Не удалось получить отзывы'
        })
    }
}


export const getOneReview = async (req,res) => {
    try {

        const review = await ReviewsModel.findById(req.params.id)

        res.json(review)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось получить отзыв'
        })
    }
}

export const editOneReview = async (req, res) => {
    try {

        await ReviewsModel.updateOne({_id: req.params.id},
            req.body,
            {returnDocument: 'after'})

        res.json({
            message: 'Отзыв успешно изменен',
            status: 'success'
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось изменить отзыв'
        })
    }
}

export const deleteOneReview = async (req, res) => {
    try {

        await ReviewsModel.deleteOne({_id: req.params.id})

        res.json({
            message: 'Отзыв успешно удалён',
            status: 'success'
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось удалить отзыв'
        })
    }
}