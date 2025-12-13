import CategoryModel from "../models/Category/Category.model.js";

const dbGetAllCategories = async () => {
    return await CategoryModel.find().populate('parent_id');
}

const dbGetCategoryById = async (parent_id) => {
    return await CategoryModel.findById(parent_id);
}

const dbCreateCategory = (newCategory) => {
    return new CategoryModel(newCategory);
}

export {
    dbGetAllCategories,
    dbGetCategoryById,
    dbCreateCategory
}