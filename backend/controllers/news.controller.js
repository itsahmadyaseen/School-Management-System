import News from "../models/news.model.js";

export const addNews = async (req, res) => {
  const classId = req.user.classId;
  const { title, description, body, date } = req.body;

  try {
    const news = new News({
      description,
      title,
      date,
      body,
      classId,
    });

    await news.save();

    console.log("Error creating news", error);
    return res.status(201).json({ message: "News created", body: news });
  } catch (error) {
    console.log("Error creating news", error);

    return res
      .status(201)
      .json({ message: "Error creating news", body: error });
  }
};

export const getNewsForClass = async (req, res) => {
  const classId = req.user.classId;

  try {
    const news = await News.find(classId);

    console.log("News fetched");
    return res.status(201).json({ message: "News fetched", data: news });
  } catch (error) {
    console.log("Error fetching news", error);

    return res
      .status(201)
      .json({ message: "Error fetching news", body: error });
  }
};
