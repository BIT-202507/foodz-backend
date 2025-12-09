import UnitTypeModel from '../models/Unit/UnitType.model.js';

const defaultUnitTypes = [
    { name: 'mass' },
    { name: 'volume' },
    { name: 'culinary' },
    { name: 'nutritional' }
];

const seedUnitTypes = async () => {
    try {
        const promises = defaultUnitTypes.map(async (type) => {
            const exists = await UnitTypeModel.findOne({ name: type.name });
            if (!exists) {
                await UnitTypeModel.create(type);
                console.log(`Tipo de unidad '${type.name}' creado.`);
            }
        });

        await Promise.all(promises);
        console.log('Check de tipos de unidad completado.');
    } catch (error) {
        console.error('Error al registrar tipos de unidad:', error);
    }
};

export default seedUnitTypes;
