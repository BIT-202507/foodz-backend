import CategoryModel from "../models/Category/Category.model.js";

const dbGetAllCategories = async () => {
    return await CategoryModel.find().populate('parent_id');
}

const dbGetCategoryById = async (id) => {
    return await CategoryModel.findById(id).populate('parent_id');
}

const dbCreateCategory = (newCategory) => {
    return new CategoryModel(newCategory);
}

export {
    dbGetAllCategories,
    dbGetCategoryById,
    dbCreateCategory
}