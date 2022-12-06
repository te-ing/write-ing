'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    post_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    createdAt: DataTypes.STRING,
    updatedAt: DataTypes.STRING,
    title: DataTypes.STRING,
    subtitle: DataTypes.STRING,
    content: DataTypes.TEXT,
    status: DataTypes.STRING,
    tag: DataTypes.STRING,
    like: DataTypes.JSON,
    comment: DataTypes.JSON,

  }, {
    sequelize,
    modelName: 'post',
    tableName: 'posts',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    timestamps: false
  });
  Post.associate = function(models) {
    // associations can be defined here
  };
  return Post;
};
