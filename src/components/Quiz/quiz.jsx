// QuizComponent.js
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Quiz/quiz.css";
import { useStateContext } from "../../context";
import Loader from "../Loader";
const allQuestionsData = [
  {
    question: "In which year was Flipkart founded?",
    options: ["2007", "2008", "2009", "2010"],
    correctOption: "2007",
  },
  {
    question: "Who is the founder of Flipkart?",
    options: ["Sachin Bansal", "Binny Bansal", "Mukesh Bansal", "Kunal Bahl"],
    correctOption: "Sachin Bansal",
  },
  {
    question: "Which Indian city is the headquarters of Flipkart?",
    options: ["Bengaluru", "Mumbai", "New Delhi", "Hyderabad"],
    correctOption: "Bengaluru",
  },
  {
    question: "What was Flipkart's original product category?",
    options: ["Electronics", "Books", "Fashion", "Groceries"],
    correctOption: "Books",
  },
  {
    question: "In 2018, which company acquired Flipkart?",
    options: ["Amazon", "Walmart", "Alibaba", "Google"],
    correctOption: "Walmart",
  },
  {
    question:
      "Which Indian festival is associated with Flipkart's 'Big Billion Days' sale?",
    options: ["Diwali", "Holi", "Christmas", "Eid"],
    correctOption: "Diwali",
  },
  {
    question: "What is the mascot of Flipkart called?",
    options: ["Flip", "Kartik", "Flippy", "Flipster"],
    correctOption: "Flipster",
  },
  {
    question: "Which online fashion retailer did Flipkart acquire in 2014?",
    options: ["Myntra", "Jabong", "Snapdeal", "Limeroad"],
    correctOption: "Myntra",
  },
  {
    question:
      "Which payment service was introduced by Flipkart to facilitate online transactions?",
    options: ["FlipPay", "FlipWallet", "FlipMoney", "PhonePe"],
    correctOption: "PhonePe",
  },
  {
    question:
      "What is the subscription service by Flipkart that offers free shipping and other benefits?",
    options: ["FlipPrime", "Flipkart Plus", "FlipRewards", "FlipShip"],
    correctOption: "Flipkart Plus",
  },
  {
    question:
      "In which year did Flipkart launch its own brand 'Flipkart SmartBuy'?",
    options: ["2014", "2016", "2018", "2020"],
    correctOption: "2016",
  },
  {
    question:
      "What is the Flipkart program that allows individuals to become sellers on the platform?",
    options: [
      "Flipkart Shop",
      "Flipkart Store",
      "Flipkart Marketplace",
      "Flipkart Mall",
    ],
    correctOption: "Flipkart Marketplace",
  },
  {
    question: "Which product category did Flipkart first start with?",
    options: ["Books", "Electronics", "Clothing", "Groceries"],
    correctOption: "Books",
  },
  {
    question:
      "Which major event is known for crashing Flipkart's website due to high traffic?",
    options: [
      "Big Sale Day",
      "Flipkart Bonanza",
      "Flash Sale",
      "Big Billion Days",
    ],
    correctOption: "Big Billion Days",
  },
  {
    question:
      "Which Indian startup is often called the 'Amazon of India' and is a major competitor of Flipkart?",
    options: ["Snapdeal", "Myntra", "Paytm Mall", "ShopClues"],
    correctOption: "Snapdeal",
  },
  {
    question: "What is the tagline of Flipkart?",
    options: [
      "Shop Smart",
      "Everything You Need",
      "Ab Har Wish Hogi Poori",
      "India's Online Megastore",
    ],
    correctOption: "Ab Har Wish Hogi Poori",
  },
  {
    question: "Which of the following is NOT a Flipkart product range?",
    options: ["Electronics", "Books", "Home Decor", "Kitchen Appliances"],
    correctOption: "Kitchen Appliances",
  },
  {
    question: "In 2018, who stepped down as the CEO of Flipkart?",
    options: ["Sachin Bansal", "Binny Bansal", "Mukesh Bansal", "Kunal Bahl"],
    correctOption: "Binny Bansal",
  },
  {
    question: "What is the name of Flipkart's customer loyalty program?",
    options: [
      "Flipkart Elite",
      "Flipkart Premium",
      "Flipkart Gold",
      "Flipkart First",
    ],
    correctOption: "Flipkart Plus",
  },
  {
    question:
      "What is the electronic payment system introduced by Flipkart to compete with Paytm?",
    options: ["FlipCash", "FlipWallet", "FlipMoney", "PhonePe"],
    correctOption: "PhonePe",
  },
];

const QuizComponent = () => {
  const [questionsData, setQuestionsData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(-1);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");

  const { address, custom } = useStateContext();
  const [send, setSend] = useState(true);

  useEffect(() => {
    // Select 3 random questions from allQuestionsData

    const selectedQuestions = allQuestionsData
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    setQuestionsData(selectedQuestions);
  }, [currentQuestion]);

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleTransfer = async () => {
    setIsLoading(true);
    await custom();
    setMessage("You earned 0.05 FLIPcoins");
    setIsLoading(false);
    setSend(false);
  };

  const handleStartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption === questionsData[currentQuestion].correctOption) {
      setScore(score + 1);
    }

    if (currentQuestion < questionsData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption("");
    } else setCurrentQuestion(3);
  };

  const renderOptions = () => {
    return questionsData[currentQuestion].options.map((option, index) => (
      <label key={index} className="option">
        <input
          type="radio"
          name="options"
          value={option}
          checked={selectedOption === option}
          onChange={() => handleOptionClick(option)}
          className="mr-2"
        />
        {option}
      </label>
    ));
  };
  const seth = () => {
    setCurrentQuestion(-1);
  };

  const navigate = useNavigate();

  return (
    <div>
      {isLoading && <Loader />}
      <div className="container h-screen">
        {currentQuestion == -1 ? (
          <div>
            <h2 className="question">Welcome to the Flipkart Quiz!</h2>
            <p className="start-text">
              Click the button below to start the quiz.
            </p>
            <button className="start-button" onClick={handleStartQuiz}>
              Start Quiz
            </button>
          </div>
        ) : currentQuestion < questionsData.length ? (
          <div>
            <h2 className="question">Question {currentQuestion + 1}:</h2>
            <h3 className="question">
              {questionsData[currentQuestion].question}
            </h3>
            <div className="flex flex-col items-center">{renderOptions()}</div>
            <button
              className="option mt-4 mr-[500px] w-[130px] flex justify-center ml-auto"
              onClick={handleNextQuestion}
              disabled={!selectedOption}
            >
              Next Question
            </button>
          </div>
        ) : (
          <div>
            <h2 className="question text-3xl font-serif">Results</h2>
            <p className="score text-xl">Your score: {score}/3</p>
            <div className="flex justify-center">
              <img
                src="../../../congrats.svg"
                alt="Congratulations !!!"
                width={500}
                height={500}
              />
            </div>
            {score === 3 ? (
              <div>
                {send && (
                  <button
                    className="option mt-4 mr-[500px] w-[130px] flex justify-center ml-auto"
                    onClick={() => {
                      handleTransfer();
                    }}
                    disabled={!selectedOption}
                  >
                    Get Your FLP
                  </button>
                )}

                {message && <div className="score"> {message} </div>}
              </div>
            ) : (
              <>
                <button className="bg-slate-500" onClick={seth}>
                  Retry
                </button>
              </>
            )}

            <Link className="earning" to="/profile">
              <form>
                <a href="#">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  View Earnings
                </a>
              </form>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizComponent;
