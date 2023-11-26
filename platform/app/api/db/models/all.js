import User from "./user";
import Transaction from "./transaction";

User.hasMany(Transaction, {
    foreignKey: "user_id",
    as: "transactions",
});

Transaction.belongsTo(User, {
    foreignKey: "user_id",
    as: "user",
});

export { User, Transaction };
