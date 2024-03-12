import PostModel from "../models/Post.js";

export const create = async(req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags,
            avatarUrl: req.body.avatarUrl,
            user: req.userId
        })

        const post = await doc.save()

        res.json(post)
    } catch (err) {
        res.status(500).json({
            massage: "не удалось создать пост"
        })
    }
};