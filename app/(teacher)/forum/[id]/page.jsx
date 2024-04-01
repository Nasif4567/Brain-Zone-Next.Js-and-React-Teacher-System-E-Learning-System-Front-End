"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import axios from "axios";
import APIURL from "@/lib/variables";

export default function page({ params }) {
  const { id } = params;
  const [questions, setQuestions] = useState([
    {
      id: 1,
      title: "How does the scientific method work?",
      description:
        "I'm having trouble understanding how the scientific method works in my science class. Can you explain the steps involved and give an example of how it's used in a real experiment?",
      answer:
        "The scientific method is a systematic way of studying the world around us. It involves making observations, asking questions, forming hypotheses, conducting experiments, and analyzing data. Let's take an example of how the scientific method is used in a real experiment. Imagine you want to find out if plants grow better in sunlight or artificial light.",
      askedBY: "alberto.gonzales",
    },
    {
      id: 2,
      title: "What is the difference between a hypothesis and a theory?",
      description:
        "I'm having trouble understanding the difference between a hypothesis and a theory. Can you explain the distinction and give an example of each?",
      askedBY: "ramiraz",
    },
    {
      id: 3,
      title: "What is an Object In Javascript?",
      description:
        "I'm having trouble understanding the concept of objects in JavaScript. Can you explain what an object is and how it's used in programming?",
      askedBY: "alberto.gonzales",
    },
    {
      id: 4,
      title:
        "How do I use the Pythagorean theorem to find the length of a side of a triangle?",
      description:
        "I'm having trouble understanding how to use the Pythagorean theorem to find the length of a side of a triangle. Can you explain the formula and give an example?",
      askedBY: "ramiraz",
    },
    {
      id: 5,
      title: "What is the difference between a hypothesis and a theory?",
      description:
        "I'm having trouble understanding the difference between a hypothesis and a theory. Can you explain the distinction and give an example of each?",
      askedBY: "alberto.gonzales",
    },
    {
      id: 6,
      title: "What is an Object In Javascript?",
      description:
        "I'm having trouble understanding the concept of objects in JavaScript. Can you explain what an object is and how it's used in programming?",
      askedBY: "ramiraz",
    },
    {
      id: 7,
      title:
        "How do I use the Pythagorean theorem to find the length of a side of a triangle?",
      description:
        "I'm having trouble understanding how to use the Pythagorean theorem to find the length of a side of a triangle. Can you explain the formula and give an example?",
      askedBY: "alberto.gonzales",
    },
    {
      id: 8,
      title: "What is the difference between a hypothesis and a theory?",
      description:
        "I'm having trouble understanding the difference between a hypothesis and a theory. Can you explain the distinction and give an example of each?",
      askedBY: "ramiraz",
    },
    {
      id: 9,
      title: "What is an Object In Javascript?",
      description:
        "I'm having trouble understanding the concept of objects in JavaScript. Can you explain what an object is and how it's used in programming?",
      askedBY: "alberto.gonzales",
    },
    {
      id: 10,
      title:
        "How do I use the Pythagorean theorem to find the length of a side of a triangle?",
      description:
        "I'm having trouble understanding how to use the Pythagorean theorem to find the length of a side of a triangle. Can you explain the formula and give an example?",
      askedBY: "ramiraz",
    },
  ]); // [question1, question2, question3, ...
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    axios
      .get(`${APIURL}/forum/getQuestions/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setQuestions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });
  }, [id]);

  useEffect(() => {
    if (search === "") {
      setSearchResults([]);
      return;
    }
    //search in local state
    const filteredQuestions = questions.filter((question) => {
      return question?.Question?.toLowerCase().includes(search.toLowerCase());
    });
    setSearchResults(filteredQuestions);
    console.log("Search results:", searchResults);
  }, [search]);

  const getAnswers = (discussion_id) => {
    //find the question with the discussion_id
    const selectedQuestionD = questions.find(
      (question) => question.discussion_id === discussion_id
    );

    //spread the selected question into the state
    setSelectedQuestion({
      ...selectedQuestionD,
    });

    axios
      .get(`${APIURL}/forum/getAnswers/${discussion_id}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("Answers:", response.data);
        setSelectedQuestion((prevQuestion) => ({
          ...(prevQuestion || {}), // if prevQuestion is null or undefined, spread an empty object
          answer: response.data,
        }));
      })
      .catch((error) => {
        console.error("Error fetching answers:", error);
      });
  };

  const addAnswer = (discussion_id) => {
    axios
      .post(
        `${APIURL}/forum/addAnswer/${id}`,
        {
          message: answer,
          discussion_id,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log("Answer added:", response.data);
        setSelectedQuestion((prevQuestion) => ({
          ...prevQuestion,
          answer: [...(prevQuestion?.answer || []), response.data],
        }));
        setAnswer("");
      })
      .catch((error) => {
        console.error("Error adding answer:", error);
      });
  };

  const deleteMessage = (message_id) => {
    axios
      .delete(`${APIURL}/forum/deleteMessage/${message_id}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("Message deleted:", response.data);
        setAnswer("");
        setSelectedQuestion(null);
      })
      .catch((error) => {
        console.error("Error deleting message:", error);
      });
  };

  return (
    <>
      <Navbar />
      <div className="flex md:flex-row w-screen  h-screen">
        <div className="w-1/3 flex flex-col  px-4 py-6 space-y-6 md:px-6 overflow-auto">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Forum - Course Name</h1>
            <div className="relative max-w-lg">
              <div className="absolute inset-y-0 flex items-center pl-3">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                className="pl-10"
                id="search"
                placeholder="Search for subjects or keywords..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          {searchResults.length > 0 && (
            <div className="space-y-4">
              {searchResults.map((question) => (
                <Card
                  key={question.course_id}
                  onClick={() => {
                    getAnswers(question.discussion_id);
                  }}
                  className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 ease-in-out   "
                >
                  <CardContent className="p-4 md:p-6">
                    <div className="space-y-2">
                      <h2 className="text-lg font-semibold">
                        {question.Question} <br />{" "}
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                          Date :{" "}
                          {new Date(question.created_at).toLocaleDateString()}
                        </span>
                      </h2>
                      <p className="text-sm leading-none text-gray-500 dark:text-gray-400">
                        {question.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}



          <div className="space-y-4">
            {searchResults.length === 0 && questions?.map((question) => (
              <Card
                key={question.course_id}
                onClick={() => {
                  getAnswers(question.discussion_id);
                }}
                className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 ease-in-out   "
              >
                <CardContent className="p-4 md:p-6">
                  <div className="space-y-2">
                    <h2 className="text-lg font-semibold">
                      {question.Question} <br />{" "}
                      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                        Date :{" "}
                        {new Date(question.created_at).toLocaleDateString()}
                      </span>
                    </h2>
                    <p className="text-sm leading-none text-gray-500 dark:text-gray-400">
                      {question.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div className="w-2/3 h-screen">
          {selectedQuestion ? (
            <Card className="w-full h-full overflow-auto">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold">
                      {selectedQuestion.Question}
                    </h1>
                    <p className="text-sm font-medium flex items-center space-x-2">
                      <time className="ml-auto" dateTime="2023-03-25T09:00:00Z">
                        {new Date(
                          selectedQuestion.created_at
                        ).toLocaleDateString()}
                      </time>
                    </p>
                  </div>

                  <div className="space-y-4 text-base leading-loose">
                    {selectedQuestion?.answer?.length !== 0 && (
                      <>
                        <h3 className="text-sm text-green-800">Answered</h3>

                        {Array.isArray(selectedQuestion?.answer) &&
                          selectedQuestion?.answer.length !== 0 &&
                          selectedQuestion?.answer?.map((answer) => (
                            <div key={answer.id} className="space-y-2">
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {answer.message}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {answer.created_at}
                              </p>
                            </div>
                          ))}
                      </>
                    )}
                    {selectedQuestion?.answer?.length === 0 && (
                      <>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          This question has not been answered yet.
                        </p>
                        <Input
                          placeholder="Write your answer here..."
                          className="w-full"
                          value={answer}
                          onChange={(e) => setAnswer(e.target.value)}
                        />
                        <Button
                          onClick={() => {
                            console.log("Answer submitted:", answer);
                            // setSelectedQuestion({
                            //   ...selectedQuestion,
                            //   answer,
                            // })
                            // setAnswer('')
                            // questions.map((question) => {
                            //   if (question.id === selectedQuestion.id) {
                            //     question.answer = answer
                            //   }
                            // }
                            // )
                            addAnswer(selectedQuestion.discussion_id);
                          }}
                        >
                          Submit Answer
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
              {selectedQuestion?.answer && (
                <CardFooter className="border-t p-4">
                  <div className="flex justify-end space-x-2">
                    {selectedQuestion?.answer?.length !== 0 && (
                      <Button
                        onClick={() => {
                          deleteMessage(
                            selectedQuestion?.answer[0]?.message_id || 0
                          );
                        }}
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                </CardFooter>
              )}
            </Card>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-lg font-semibold text-gray-500 dark:text-gray-400">
                Select a question to view the details
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
