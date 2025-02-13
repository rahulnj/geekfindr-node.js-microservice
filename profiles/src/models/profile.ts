import mongoose from 'mongoose'

// An interface that describes the properties
// that are requried to create a new Profile
interface ProfileAttrs {
  id?: string
  email: string
  username: string
  avatar?: string
  bio?: string
  organizations?: string[]
  followers?: string[]
  following?: string[]
  followersCount?: number
  followingCount?: number
  experience?: object[]
  education?: object[]
  works?: object[]
  skills?: string[]
  socials?: object[]
}

// An interface that describes the properties
// that a Profile Model has
interface ProfileModel extends mongoose.Model<ProfileDoc> {
  build(attrs: ProfileAttrs): ProfileDoc
}

// An interface that describes the properties
// that a Profile Document has
export interface ProfileDoc extends mongoose.Document {
  email: string
  username: string
  avatar?: string
  bio?: string
  organizations?: string[]
  followers?: string[]
  following?: string[]
  followersCount?: number
  followingCount?: number
  experience?: object[]
  education?: object[]
  works?: object[]
  skills?: string[]
  socials?: object[]
  createdAt: string
  updatedAt: string
}

const profileSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
    },
    bio: {
      type: String,
    },
    organizations: {
      type: [String],
    },
    followers: {
      type: [String],
    },
    following: {
      type: [String],
    },
    followersCount: {
      type: Number,
    },
    followingCount: {
      type: Number,
    },
    experience: {
      type: [Object],
    },
    education: {
      type: [Object],
    },
    works: {
      type: [Object],
    },
    skills: {
      type: [String],
    },
    socials: {
      type: [Object],
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v
        ret.id = ret._id
        delete ret._id
      },
    },
    timestamps: true,
  }
)

profileSchema.statics.build = (attrs: ProfileAttrs) => {
  const _id = attrs.id
  delete attrs.id
  return new Profile({ ...attrs, _id })
}
const Profile = mongoose.model<ProfileDoc, ProfileModel>(
  'Profile',
  profileSchema
)

export { Profile }
