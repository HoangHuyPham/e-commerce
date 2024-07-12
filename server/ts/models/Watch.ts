import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
  } from '@sequelize/core';
  import { Attribute, PrimaryKey, AutoIncrement, NotNull } from '@sequelize/core/decorators-legacy';
  
  
  
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

    @Attribute(DataTypes.STRING)
    declare previewLink: string | null;

  }