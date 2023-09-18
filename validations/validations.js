import {body} from "express-validator";
import {validationResult} from "express-validator";

export  default (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json(errors.array())
    }
    next()
}

export const registerUserValidation = [
    body('email','Неверный формат почты').isEmail(),
    body('image', 'Неверный путь').optional().isString(),
    body('status', 'Укажите статус').isString(),
    body('name', 'Укажите ваше имя').isString(),
    body('password', 'Пароль должен быть минимум 8 символов').isLength({min:8}),
    body('description', 'Заполните описание').optional().isString(),
    body('resume', 'Заполните резюме').optional().isString(),
    body('profession', 'Заполните ваши профессии').optional().isArray()
];

export const loginUserValidation = [
    body('email','Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 8 символов').isLength({min:8})
];
export const resetPasswordValidation = [
    body('email','Неверный формат почты').isEmail(),
    body('oldPassword', 'Пароль должен быть минимум 8 символов').isLength({min:8}),
    body('newPassword', 'Пароль должен быть минимум 8 символов').isLength({min:8})
];

export const addReviewValidation = [
    body('creatorId','Неверный формат id создателя').isMongoId(),
    body('title', 'Заголовок отзыва минимум 2 символа').isLength({min:2}),
    body('description', 'Описание отзыва минимум 3 символа').isLength({min:3}),
    body('userId', 'Неверный формат id получателя').isLength({min:3})
];

export const editReviewValidation = [
    body('title', 'Заголовок отзыва минимум 2 символа').isLength({min:2}),
    body('description', 'Описание отзыва минимум 3 символа').isLength({min:3})
];

export const addOrderValidation = [
    body('creatorId','Неверный формат id создателя').isMongoId(),
    body('title', 'Заголовок отзыва минимум 2 символа').isLength({min:2}),
    body('description', 'Описание отзыва минимум 3 символа').isLength({min:3}),
    body('executorId', 'Неверный формат id получателя').optional().isLength({min:3}),
    body('category', 'Неверный формат категории').isString(),
    body('price', 'Неверный формат цены').isNumeric(),
    body('deadline', 'Неверный формат дедлайна').isNumeric(),
    body('technology', 'Неверный формат технологий').isArray(),
    body('responses', 'Неверный формат откликов').isArray(),
    body('views', 'Неверный формат просмотров').isNumeric(),
    body('status', 'Неверный формат статуса').isString()
];