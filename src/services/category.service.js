import ProductCategoryModel from "../models/Category/ProductCategory.model.js";

const dbRegisterCategory = (newCategory) => {
    return ProductCategoryModel.create(newCategory);
}

const dbGetAllCategories = () => {
    return ProductCategoryModel.find();
}

const dbGetCategoryById = (_id) => {
    return ProductCategoryModel.findById(_id);
}

const dbDeleteCategoryById = (_id) => {
    return ProductCategoryModel.findByIdAndDelete(_id);
}

const dbUpdateCategoryById = (_id, categoryUpdated) => {
    return ProductCategoryModel.findByIdAndUpdate(_id, categoryUpdated, { new: true });
}


export {
    dbRegisterCategory,
    dbGetAllCategories,
    dbGetCategoryById,
    dbDeleteCategoryById,
    dbUpdateCategoryById
}
