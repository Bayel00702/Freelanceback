import express from 'express'
import mongoose from "mongoose";

import {
    addReviewValidation,
    editReviewValidation,
    loginUserValidation,
    registerUserValidation,
    resetPasswordValidation,
    addOrderValidation
} from "./validations/validations.js";
import handeValidators from "./validations/validations.js"
import {loginUser, registerUser, resetPassword} from "./controller/auth.js";
import checkAuth from "./validations/checkAuth.js";
import {addReview, deleteOneReview, editOneReview, getAllReviews, getOneReview} from "./controller/reviews.js";
import {createOrder,getAllOrders,getOneOrder,deleteOneOrder, editOneOrder} from "./controller/orders.js";
import {getAllUser,getOneUser} from "./controller/users.js";
import {getAllResponse,addResponse} from "./controller/responses.js";
import cors from 'cors'
import {createTechnology, delTechnology, getAllTechnology} from "./controller/technology.js";
import {createCategory, delCategory, getAllCategory} from "./controller/category.js";
import {createSubCategory, delSubCategory, getAllSubCategory} from "./controller/subcategory.js";
import {createSubCategoryItem, delSubCategoryItem, getAllSubCategoryItem} from "./controller/subcategoryitem.js";



const api = express();

api.use(express.json());
api.use(cors());

const mongoDBPassword = 'itrun2023';

mongoose.connect(`mongodb+srv://itrun:${mongoDBPassword}@itrun.dgzi3wd.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => console.log('Mongo DB успешно запущен'))
    .catch((err) =>  console.log('Ошибка при запуске Mongo DB ' ,err));

const PORT = process.env.PORT || 4444;


// auth

api.post('/register', registerUserValidation, handeValidators, registerUser);
api.post('/login', loginUserValidation, handeValidators, loginUser);
api.patch('/reset/password', resetPasswordValidation, handeValidators, checkAuth, resetPassword);

api.get('/users', getAllUser);
api.get('/users/:id', getOneUser);


// reviews

api.post('/reviews', addReviewValidation, handeValidators, checkAuth, addReview );
api.get('/reviews', getAllReviews );
api.get('/reviews/:id', getOneReview );

api.patch('/reviews/:id', editReviewValidation, handeValidators, checkAuth, editOneReview);
api.delete('/reviews/:id', checkAuth, deleteOneReview);

// orders

api.post('/orders', addOrderValidation, handeValidators, checkAuth, createOrder);
api.get('/orders',getAllOrders);
api.get('/orders/:id',getOneOrder);
api.patch('/orders/:id',checkAuth, editOneOrder);
api.delete('/orders/:id',checkAuth, deleteOneOrder);


// responses

api.get('/responses', checkAuth, getAllResponse);
api.post('/responses', checkAuth, addResponse);

// technologies

api.post('/technology',  createTechnology);
api.get('/technology',  getAllTechnology);
api.delete('/technology/:id',  delTechnology);

// categories

api.post('/category', createCategory);
api.get('/category', getAllCategory);
api.delete('/category/:id', delCategory);

// subcategory

api.post('/subcategory', createSubCategory);
api.get('/subcategory/:categoryId', getAllSubCategory);
api.delete('/subcategory/:id', delSubCategory);

//subcategoryItem

api.post('/subcategoryItem', createSubCategoryItem);
api.get('/subcategoryItem/:subcategoryId', getAllSubCategoryItem);
api.delete('/subcategoryItem/:id', delSubCategoryItem);






api.listen(PORT, () => {
    console.log(`Сервер запущен на порту http://localhost:${PORT}`)
});

