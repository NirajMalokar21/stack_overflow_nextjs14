import { Schema, models, model, Document} from 'mongoose'

export interface IAccount extends Document {
    clerkId: string,
    name: string,
    username: string,
    email: string,
    password?: string,
    bio?: string,
    picture: string,
    location?: string,
    portfolio?: string,
    reputation?: number,
    joinDate: Date,
    saved: Schema.Types.ObjectId[],
}

const AccountSchema: Schema = new Schema({
    clerkId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Optional field
    bio: { type: String }, // Optional field
    picture: { type: String, required: true },
    location: { type: String }, // Optional field
    portfolio: { type: String }, // Optional field
    reputation: { type: Number, default: 0 }, // Optional field
    joinDate: { type: Date, required: true, default: Date.now },
    saved: [{type: Schema.Types.ObjectId, ref: "Question"}]
});

const Account = models.Account || model('Account', AccountSchema)

export default Account;