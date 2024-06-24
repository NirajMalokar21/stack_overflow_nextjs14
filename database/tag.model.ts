import { Schema, models, model, Document} from 'mongoose'

export interface ITag extends Document {
    name: string;
    description: string;
    questions: Schema.Types.ObjectId[];
    followers: Schema.Types.ObjectId[];
    createdAt: Date;
}

const TagSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }], // Assuming there's a Question model
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Assuming there's a User model
    createdAt: { type: Date, default: Date.now }
});

const Tag = models.Tag || model('Tag', TagSchema)

export default Tag