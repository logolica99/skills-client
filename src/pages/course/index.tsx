import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "@/Contexts/UserContext";
import axios from "axios";
import { BACKEND_URL, COURSE_ID } from "@/api.config";
import { decryptString } from "@/helpers";

function findObjectById(data: any, targetId: any) {
  // Check if chapters exist in the data
  const chapters = data?.chapters || [];

  // Iterate through chapters
  for (const chapter of chapters) {
    // Check if modules exist in the current chapter
    const modules = chapter?.modules || [];

    // Iterate through modules searching for matching serial key
    for (let result of modules) {
      if (result.id === targetId) {
        return result;
      }
    }
  }

  // If no match is found, return undefined
  return undefined;
}

export default function CourseRedirect() {
  const router = useRouter();

  const [user, setUser] = useContext<any>(UserContext);
  const [quizAnswer, setQuizAnswer] = useState<any>({});
  const [assignmentSubmission, setAssignmentSubmission] = useState({
    youtube_link: "",
    github_link: "",
  });
  const [assignmentEvaluted, setAssignmentEvaluted] = useState<any>([]);

  const [activeModule, setActiveModule] = useState<any>({});

  const [courseData, setCourseData] = useState<any>({});
  const activeModuleRef = useRef<any>();

  const fetchCourse = () => {
    setUser({ ...user, loading: true });
    const token = localStorage.getItem("token");
    axios
      .get(BACKEND_URL + "/user/course/getfull/" + COURSE_ID, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCourseData(res.data);
        if (res.data.maxModuleSerialProgress === 0) {
          submitProgress(
            res.data.chapters[0].modules[0].id,
            res.data.chapters[0].modules[0].score,
          );
        }
        res.data.chapters.forEach((chapter: any) => {
          chapter.modules.forEach((module: any) => {
            if (module.serial === res.data.maxModuleSerialProgress + 1) {
              setActiveModule(module);
            }
          });
        });

        setUser({ ...user, loading: false });
      })
      .catch((err) => {
        setUser({ ...user, loading: false });
      });
  };

  const submitProgress = (module_id: any, score: any) => {
    const token = localStorage.getItem("token");
    const module_search = findObjectById(courseData, module_id);
    if (module_search.is_live) {
      axios
        .post(
          `${BACKEND_URL}/user/module/addProgress/${module_id}?points=${score}&type=${activeModule?.data?.category}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((res) => {
          axios
            .get(BACKEND_URL + "/user/course/getfull/" + COURSE_ID, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              setCourseData(res.data);
              if (res.data.maxModuleSerialProgress === 0) {
                submitProgress(
                  res.data.chapters[0].modules[0].id,
                  res.data.chapters[0].modules[0].score,
                );
              }

              setUser({
                ...user,
                loading: false,
                scoreTrigger: !user.scoreTrigger,
              });
            })
            .catch((err) => {
              setUser({ ...user, loading: false });
            });
        })
        .catch((err) => {
          setUser({ ...user, loading: false });
        });
    }
  };

  const submitAssignment = (e: any) => {
    e.preventDefault();
    setUser({ ...user, loading: true });
    const token = localStorage.getItem("token");

    if (assignmentEvaluted?.length > 0) {
      axios
        .put(
          BACKEND_URL + "/user/assignment/edit/" + activeModule.id,
          {
            submission: assignmentSubmission,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(() => {
          setUser({ ...user, loading: false });
          toast.success("Assignment Submitted Successfully");
          submitProgress(activeModule.id, activeModule.score);
        })
        .catch((err) => {
          setUser({ ...user, loading: false });
          toast.error("Something Went Wrong");
        });
    } else {
      axios
        .post(
          BACKEND_URL + "/user/assignment/submit/" + activeModule.id,
          {
            submission: assignmentSubmission,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(() => {
          setUser({ ...user, loading: false });
          toast.success("Assignment Submitted Successfully");
          submitProgress(activeModule.id, activeModule.score);
        })
        .catch((err) => {
          setUser({ ...user, loading: false });
          toast.error("Something Went Wrong");
        });
    }
  };

  const fetchDiscussions = () => {
    const token = localStorage.getItem("token");
    setDiscussions([]);

    axios
      .get(BACKEND_URL + `/user/module/discussion/list/${activeModule.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDiscussions(res.data.data);
      })
      .catch((err) => {});
  };

  const getCFHandle = () => {
    setUser({ ...user, loading: true });
    const token = localStorage.getItem("token");

    axios
      .get(BACKEND_URL + "/user/module/getCfHandle", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCfHandle(res.data.data[0].cf_handle);
        setUser({ ...user, loading: false });
      })
      .catch((err) => {
        setUser({ ...user, loading: false });
      });
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  useEffect(() => {
    if (activeModule?.data?.category === "CODE" && activeModule?.data?.is_cf) {
      getCFHandle();
    }
    activeModuleRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "start",
    });
  }, [activeModule]);

    useEffect(() => {
        router.push("/course/12");
    });

    return <></>;
}