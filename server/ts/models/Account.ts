import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
  } from '@sequelize/core';
  import { Attribute, PrimaryKey, AutoIncrement, NotNull, Unique, Default } from '@sequelize/core/decorators-legacy';
  
  
  
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

    @Attribute(DataTypes.STRING)
    declare avatarLink: string | null;

    @Default(false)
    @Attribute(DataTypes.BOOLEAN)
    declare isAdmin: boolean | null;

  }