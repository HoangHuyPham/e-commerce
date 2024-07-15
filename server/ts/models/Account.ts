import {
  CreationOptional, DataTypes, InferAttributes,
  InferCreationAttributes, Model, NonAttribute
} from '@sequelize/core';
import { Attribute, AutoIncrement, BelongsTo, Default, NotNull, PrimaryKey, Unique } from '@sequelize/core/decorators-legacy';
import { Image } from './Image';



export class Account extends Model<InferAttributes<Account>, InferCreationAttributes<Account>> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  @NotNull
  declare id: CreationOptional<number>;

  @PrimaryKey
  @Unique
  @Attribute(DataTypes.STRING)
  declare userName: string;

  @Attribute(DataTypes.STRING)
  declare password: string;

  @Attribute(DataTypes.STRING)
  declare firstName: string;

  @Attribute(DataTypes.STRING)
  declare lastName: string;

  @Attribute(DataTypes.STRING)
  declare email: string | null;

  @Attribute(DataTypes.STRING)
  declare address: string | null;

  @Attribute(DataTypes.INTEGER)
  declare phoneNumber: number | null;

  @Default(false)
  @Attribute(DataTypes.BOOLEAN)
  declare isAdmin: boolean | null;

  @BelongsTo(() => Image, 'avatarId')
  declare avatar?: NonAttribute<Image>;

  @Attribute(DataTypes.INTEGER)
  declare avatarId?: number;
}