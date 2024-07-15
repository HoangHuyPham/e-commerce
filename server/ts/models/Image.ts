import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from '@sequelize/core';
import { Attribute, PrimaryKey, AutoIncrement, NotNull, Unique } from '@sequelize/core/decorators-legacy';



export class Image extends Model<InferAttributes<Image>, InferCreationAttributes<Image>> {
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    @NotNull
    declare id: CreationOptional<number>;

    @Unique
    @Attribute(DataTypes.STRING)
    declare publicId: string;

    @Attribute(DataTypes.STRING)
    declare url: string;

}