import Home from "@/Views/Home";
import About from "@/Views/About";
import Blog from "@/Views/Blog";
import Project from "@/Views/Project";
import Message from "@/Views/Message";
import BlogDetail from "@/Views/Blog/detail";
export default [{
    name: "Home",
    path: "/",
    component: Home,
    meta: {
      title: "首页"
    }
  },
  {
    name: "About",
    path: "/about",
    component: About,
    meta: {
      title: "关于"
    }
  },
  {
    name: "Blog",
    path: "/blog",
    component: Blog,
    meta: {
      title: "文章"
    }
  },
  {
    name: "BlogType",
    path: "/blog/type/:typeId",
    component: Blog,
    meta: {
      title: "文章"
    }
  },
  {
    name: "BlogDetail",
    path: "/blog/detail/:id",
    component: BlogDetail,
    meta: {
      title: "文章详情"
    }
  },
  {
    name: "Project",
    path: "/project",
    component: Project,
    meta: {
      title: "项目"
    }
  },
  {
    name: "Message",
    path: "/message",
    component: Message,
    meta: {
      title: "留言板"
    }
  },
]