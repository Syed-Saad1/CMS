import { useEffect, useRef, useState } from "react";
import { getAllCourses } from "@/query/getAllCourses";
import {
  Bot,
  X,
  Send,
  ChevronRight,
  BookOpen,
  Clock,
  CalendarDays,
  IndianRupee,
  ArrowLeft,
  RotateCcw,
  LoaderCircle,
} from "lucide-react";

const courseOptions = [
  { label: "Course Price", value: "price", icon: IndianRupee },
  { label: "Course Timing", value: "timing", icon: Clock },
  { label: "Course Days", value: "days", icon: CalendarDays },
  { label: "Course Duration", value: "duration", icon: BookOpen },
  { label: "Course Overview", value: "overview", icon: BookOpen },
];

function AiChatbot() {
  const { data, isLoading, isError } = getAllCourses();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const messagesEndRef = useRef(null);

  const courses = Array.isArray(data?.data)
    ? data.data
    : (data?.data?.courses ?? []);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: Date.now(),
          role: "assistant",
          type: "welcome",
          text: "Hi there! 👋 Welcome to our Course Assistant.",
          subtitle:
            "I can help you explore our courses, prices, schedules, and more. What would you like to learn about?",
        },
      ]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, isLoading]);

  const addMessage = (message) => {
    setMessages((previous) => [
      ...previous,
      { id: Date.now() + Math.random(), ...message },
    ]);
  };

  const showCourses = () => {
    setSelectedCourse(null);

    addMessage({
      role: "assistant",
      type: "courses",
      text: "Here are our available courses. Select one to explore its details.",
    });
  };

  const selectCourse = (course) => {
    setSelectedCourse(course);

    addMessage({
      role: "user",
      text: course.title,
    });

    addMessage({
      role: "assistant",
      type: "course-details",
      text: course.title,
      description:
        course.description || "No description is available for this course.",
      course,
    });
  };

  const getCourseAnswer = (option, course) => {
    switch (option) {
      case "price":
        return {
          title: "Course Price",
          answer:
            course.price != null
              ? `The price of ${course.title} is Rs. ${Number(
                  course.price,
                ).toLocaleString()}.`
              : "The price for this course has not been specified yet. Please contact the institute for details.",
        };

      case "timing": {
        const start = course.courseTime?.startTime;
        const end = course.courseTime?.endTime;

        return {
          title: "Course Timing",
          answer:
            start || end
              ? `The class timing for ${course.title} is ${
                  start || "not specified"
                } – ${end || "not specified"}.`
              : "The class timing has not been specified yet.",
        };
      }

      case "days":
        return {
          title: "Course Days",
          answer:
            course.courseDays?.length > 0
              ? `Classes for ${course.title} are held on ${course.courseDays.join(
                  ", ",
                )}.`
              : "The class days have not been specified yet.",
        };

      case "duration":
        return {
          title: "Course Duration",
          answer:
            course.courseDuration?.value != null
              ? `${course.title} has a duration of ${course.courseDuration.value} ${
                  course.courseDuration.unit || ""
                }.`
              : "The course duration has not been specified yet.",
        };

      case "overview":
        return {
          title: "Course Overview",
          answer:
            course.content ||
            course.description ||
            "No course overview is available yet.",
        };

      default:
        return {
          title: "Course Information",
          answer: "Please select one of the available options.",
        };
    }
  };

  const handleOptionClick = (option) => {
    if (!selectedCourse) return;

    const selectedOption = courseOptions.find((item) => item.value === option);

    addMessage({
      role: "user",
      text: selectedOption?.label || option,
    });

    const result = getCourseAnswer(option, selectedCourse);

    addMessage({
      role: "assistant",
      type: "answer",
      text: result.title,
      answer: result.answer,
    });
  };

  const handleSendMessage = (event) => {
    event.preventDefault();

    const value = input.trim();
    if (!value) return;

    addMessage({
      role: "user",
      text: value,
    });

    setInput("");

    const normalized = value.toLowerCase();

    if (
      normalized.includes("course") &&
      (normalized.includes("available") ||
        normalized.includes("all") ||
        normalized.includes("other"))
    ) {
      showCourses();
      return;
    }

    if (selectedCourse) {
      const option = courseOptions.find(
        (item) =>
          normalized.includes(item.value) ||
          normalized.includes(item.label.toLowerCase()),
      );

      if (option) {
        handleOptionClick(option.value);
        return;
      }
    }

    addMessage({
      role: "assistant",
      type: "help",
      text: selectedCourse
        ? `I can provide the price, timing, days, duration, or overview for ${selectedCourse.title}. Please select an option below.`
        : "Please select a course first so I can show you its details.",
    });
  };

  const resetChat = () => {
    setSelectedCourse(null);
    setInput("");
    setMessages([
      {
        id: Date.now(),
        role: "assistant",
        type: "welcome",
        text: "Welcome back! 👋",
        subtitle: "Which course would you like to explore today?",
      },
    ]);
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open AI assistant"
          className="fixed bottom-20 right-4 z-50 flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl transition duration-200 hover:scale-105 lg:bottom-6"
        >
          <Bot className="size-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <section
          aria-label="Course AI Assistant"
          className="fixed bottom-4 right-3 z-50 flex h-[min(650px,calc(100dvh-100px))] w-[calc(100vw-24px)] max-w-100 flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl sm:bottom-6 sm:right-6 sm:w-100"
        >
          {/* Header */}
          <header className="flex shrink-0 items-center justify-between border-b border-border bg-primary px-4 py-4 text-primary-foreground">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/15">
                <Bot className="size-6" />
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-sm font-semibold">
                  Course AI Assistant
                </h2>
                <p className="mt-0.5 text-xs opacity-80">
                  Explore courses and details
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                onClick={resetChat}
                aria-label="Reset conversation"
                className="rounded-lg p-2 transition hover:bg-white/15"
              >
                <RotateCcw className="size-4" />
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close assistant"
                className="rounded-lg p-2 transition hover:bg-white/15"
              >
                <X className="size-5" />
              </button>
            </div>
          </header>

          {/* Messages */}
          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Bot className="size-4" />
                  </div>
                )}

                <div
                  className={`min-w-0 max-w-[88%] space-y-3 ${
                    message.role === "user" ? "order-first" : ""
                  }`}
                >
                  <div
                    className={`rounded-2xl px-3.5 py-3 text-sm leading-relaxed ${
                      message.role === "user"
                        ? "rounded-br-sm bg-primary text-primary-foreground"
                        : "rounded-bl-sm bg-muted text-foreground"
                    }`}
                  >
                    <p className="whitespace-pre-wrap wrap-break-word">
                      {message.text}
                    </p>

                    {message.subtitle && (
                      <p className="mt-2 text-muted-foreground">
                        {message.subtitle}
                      </p>
                    )}

                    {message.description && (
                      <p className="mt-2 text-muted-foreground">
                        {message.description}
                      </p>
                    )}

                    {message.answer && (
                      <p className="mt-2 whitespace-pre-wrap wrap-break-word text-muted-foreground">
                        {message.answer}
                      </p>
                    )}
                  </div>

                  {/* Dynamic Course Options */}
                  {message.type === "welcome" && (
                    <button
                      type="button"
                      onClick={showCourses}
                      className="flex w-full items-center justify-between gap-2 rounded-xl border border-border bg-background p-3 text-left text-sm transition hover:border-primary hover:bg-primary/5"
                    >
                      <span className="flex items-center gap-2">
                        <BookOpen className="size-4 text-primary" />
                        Explore Available Courses
                      </span>
                      <ChevronRight className="size-4" />
                    </button>
                  )}

                  {message.type === "courses" && (
                    <div className="space-y-2">
                      {isLoading ? (
                        <div className="flex items-center gap-2 py-3 text-sm text-muted-foreground">
                          <LoaderCircle className="size-4 animate-spin" />
                          Loading available courses...
                        </div>
                      ) : isError ? (
                        <div className="space-y-2 text-sm">
                          <p className="text-destructive">
                            Unable to load courses. Please try again.
                          </p>
                          <button
                            type="button"
                            onClick={showCourses}
                            className="rounded-lg border px-3 py-2 hover:bg-muted"
                          >
                            Try again
                          </button>
                        </div>
                      ) : courses.length === 0 ? (
                        <p className="rounded-xl border p-3 text-sm text-muted-foreground">
                          No courses are currently available.
                        </p>
                      ) : (
                        courses.map((course) => (
                          <button
                            key={course._id}
                            type="button"
                            onClick={() => selectCourse(course)}
                            className="flex w-full items-center justify-between gap-3 rounded-xl border border-border bg-background p-3 text-left transition hover:border-primary hover:bg-primary/5"
                          >
                            <span className="flex min-w-0 items-center gap-3">
                              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <BookOpen className="size-4" />
                              </span>

                              <span className="min-w-0">
                                <span className="block text-sm font-medium">
                                  {course.title}
                                </span>
                                <span className="mt-1 block text-xs text-muted-foreground">
                                  Explore course details
                                </span>
                              </span>
                            </span>

                            <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                          </button>
                        ))
                      )}
                    </div>
                  )}

                  {/* Selected Course Follow-up Options */}
                  {message.type === "course-details" && (
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-muted-foreground">
                        What would you like to know?
                      </p>

                      <div className="grid grid-cols-2 gap-2">
                        {courseOptions.map((option) => {
                          const Icon = option.icon;

                          return (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => handleOptionClick(option.value)}
                              className="flex min-h-12 items-center gap-2 rounded-xl border border-border bg-background p-2.5 text-left text-xs font-medium transition hover:border-primary hover:bg-primary/5"
                            >
                              <Icon className="size-4 shrink-0 text-primary" />
                              {option.label}
                            </button>
                          );
                        })}
                      </div>

                      <button
                        type="button"
                        onClick={showCourses}
                        className="flex items-center gap-1 pt-1 text-xs text-primary hover:underline"
                      >
                        <ArrowLeft className="size-3" />
                        Explore other courses
                      </button>
                    </div>
                  )}

                  {message.type === "answer" && (
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground">
                        Anything else about this course?
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {courseOptions
                          .filter((option) => option.label !== message.text)
                          .map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => handleOptionClick(option.value)}
                              className="rounded-full border border-border bg-background px-3 py-2 text-xs transition hover:border-primary hover:bg-primary/5"
                            >
                              {option.label}
                            </button>
                          ))}
                      </div>

                      <button
                        type="button"
                        onClick={showCourses}
                        className="text-xs text-primary hover:underline"
                      >
                        Browse other courses
                      </button>
                    </div>
                  )}

                  {message.type === "help" && (
                    <div className="flex flex-wrap gap-2">
                      {selectedCourse ? (
                        courseOptions.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => handleOptionClick(option.value)}
                            className="rounded-full border border-border px-3 py-2 text-xs hover:border-primary"
                          >
                            {option.label}
                          </button>
                        ))
                      ) : (
                        <button
                          type="button"
                          onClick={showCourses}
                          className="rounded-full border border-border px-3 py-2 text-xs hover:border-primary"
                        >
                          Explore courses
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>
          <div className="shrink-0 pb-2 text-center text-[10px] text-muted-foreground">
            Course information provided by your institute
          </div>
        </section>
      )}
    </>
  );
}
export default AiChatbot;
