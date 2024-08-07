import {
  DataTypes, InferAttributes,
  InferCreationAttributes, Model, NonAttribute
} from '@sequelize/core';
import { Attribute, AutoIncrement, BelongsTo, NotNull, PrimaryKey } from '@sequelize/core/decorators-legacy';
import { Image } from './Image';



export class Watch extends Model<InferAttributes<Watch>, InferCreationAttributes<Watch>> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  @NotNull
  declare id: number;

  @Attribute(DataTypes.STRING)
  declare name: string | null;

  @Attribute(DataTypes.STRING)
  declare detail: string | null;

  @Attribute(DataTypes.DOUBLE)
  declare price: string | 0;

  @Attribute(DataTypes.INTEGER)
  declare category: number | -1;

  @BelongsTo(() => Image, 'previewId')
  declare preview?: NonAttribute<Image>;

  @Attribute(DataTypes.INTEGER)
  declare previewId?: number | null;
}