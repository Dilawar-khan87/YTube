const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

app.use(express.json());

const videos = [
  {
    id: 1,
    user_id: 1,
    title: "Video 1",
    description: "Description 1",
    views: 100,
    likes: 10,
    dislikes: 1,
    published: true,
    video_url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
  {
    id: 2,
    user_id: 2,
    title: "Video 2",
    description: "Description 2",
    views: 200,
    likes: 20,
    dislikes: 2,
    published: true,
    video_url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
  {
    id: 3,
    user_id: 3,
    title: "Video 3",
    description: "Description 3",
    views: 300,
    likes: 30,
    dislikes: 3,
    published: false,
    video_url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
];

const users = [
  {
    id: 3,
    name: "Jack",
    email: "j@gmail.com",
    password: "123",
    age: 20,
    token: "",
  },
];

app.get("/users", (req, res) => {
  res.send(users);
});
function authenticate(user) {
  console.log("authenticate", user);
  const tokenData = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
      data: {
        userId: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        age: user.age,
      },
    },
    "secret"
  );
  user.token = tokenData;
}

app.post("/users/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((user) => user.email === email && user.password === password);

  authenticate(user);
  res.json(user);

});

app.get("/users/profile", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, "secret");
    console.log(token);
    const user = users.find((user) => user.id === decoded.data.userId);
    if (!user) {
      res.send(404, "User not found");
    }
    res.send(user);
  } catch (err) {
    res.send(403, "Forbidden");
  }
});


app.post("/users", (req, res) => {
  const user = req.body;
  user.id = users.length + 1;
  users.push(user);
  res.send(user);
});

app.get("/users/videos", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, "secret");
    const user = users.find((user) => user.id === decoded.data.userId);
    if (!user) {
      res.send(404, "User not found");
    }
    const myVideos = videos.filter((video) => video.user_id === user.id);
    res.send(myVideos);
  } catch (err) {
    console.log(err);
    res.send(403, "Forbidden");
  }
});

// all Video routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/videos", (req, res) => {
  // Video.findAll({}).then(videos => {
  //     res.send(videos);
  // });
  res.json(videos);
});

app.get("/videos/:id", (req, res) => {
  const id = req.params.id;

  // console.log(id);
  // res.send(`Video ${id}`);
  const video = videos.find((video) => video.id == id);
  increaseViews(video);
  if (video) {
    res.json(video);
  } else {
    res.status(404).send("Video not found");
  }
});

function increaseViews(video) {
  video.views += 1;
}

app.post("/videos", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, "secret");
    const user = users.find((user) => user.id === decoded.data.userId);
    if (!user) {
      res.send(404, "User not found");
    }
    const { title, description, published, video_url } =
      req.body;
      const { views, likes, dislikes} = 0;
    const video = {
      id: videos.length + 1,
      user_id: user.id,
      title,
      description,
      views,
      likes,
      dislikes,
      published,
      video_url,
    };
    videos.push(video);
    res.json(video);
  } catch (err) {
    res.send(403, "Forbidden");
  }
});

app.put("/videos/:id", (req, res) => {
  const id = req.params.id;
  const { title, description, views, likes, dislikes, published, video_url } =
    req.body;
  const video = {
    id,
    title,
    description,
    views,
    likes,
    dislikes,
    published,
    video_url,
  };
  const index = videos.findIndex((video) => video.id == id);
  videos[index] = video;
  res.json(video);
});

app.delete("/videos/:id", (req, res) => {
  const id = req.params.id;
  const index = videos.findIndex((video) => video.id == id);
  videos.splice(index, 1);
  res.json({
    message: "Video deleted",
  });
});
// all video routes ending...

app.listen(5000, () => {
  console.log("listning on port 3000");
});
