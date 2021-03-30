const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    nick: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const UserBio = sequelize.define('user_bio', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    // userId: {type: DataTypes.STRING, unique: true},
    name: {type: DataTypes.STRING},
    location: {type: DataTypes.STRING},
    age: {type: DataTypes.INTEGER},
    sex: {type: DataTypes.STRING},
    shortBio: {type: DataTypes.STRING},
    profilePhoto: {type: DataTypes.STRING},
})



const PendingQuestions = sequelize.define('pending_questions', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    from: {type: DataTypes.INTEGER, defaultValue: 0},
    // to: {type: DataTypes.INTEGER, allowNull: false},
    // dateAsked: {type: DataTypes.INTEGER, defaultValue: Date.now()},
    questionText: {type: DataTypes.STRING, allowNull: false},
})

const AnsweredQuestions = sequelize.define('answered_questions', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    from: {type: DataTypes.INTEGER, defaultValue: 0},
    // to: {type: DataTypes.INTEGER, allowNull: false},
    // dateAsked: {type: DataTypes.INTEGER, allowNull: false},
    // dateAnswered: {type: DataTypes.INTEGER, defaultValue: Date.now()},
    questionText: {type: DataTypes.STRING, allowNull: false},
    answerText: {type: DataTypes.STRING(4096), allowNull: false},
})


const Friends = sequelize.define('friends', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    // questionId: {type: DataTypes.INTEGER, allowNull: false},
    // userId: {type: DataTypes.INTEGER, allowNull: false},
})


const Likes = sequelize.define('likes', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    // userId: {type: DataTypes.INTEGER, allowNull: false},
    // questionId: {type: DataTypes.INTEGER, allowNull: false},
})


///through
const FriendUser = sequelize.define('friend_user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})



User.hasOne(UserBio)
UserBio.belongsTo(User)

User.hasMany(PendingQuestions)
PendingQuestions.belongsTo(User)

User.hasMany(AnsweredQuestions)
AnsweredQuestions.belongsTo(User)

AnsweredQuestions.hasMany(Likes)
Likes.belongsTo(AnsweredQuestions)

User.hasMany(Likes)
Likes.belongsTo(User)



Friends.belongsToMany(User, {through: FriendUser })
User.belongsToMany(Friends, {through: FriendUser })

module.exports = {
    User,
    UserBio,
    PendingQuestions,
    AnsweredQuestions,
    Likes,
    Friends,
    FriendUser
}