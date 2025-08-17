import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

const QUESTIONS = [
  {
    part: "Part 1 – SOP Generator",
    q: "How do you currently document the way tasks or processes are done?",
    answers: [
      "We don't document tasks or processes at all (Not fulfilled)",
      "Processes are explained verbally when needed",
      "Basic notes/manuals exist but not updated",
      "Standardized SOPs exist for most functions",
      "Fully documented, updated, and accessible SOPs for all tasks"
    ]
  },
  {
    part: "Part 1 – SOP Generator",
    q: "Are there any processes that only certain people know how to do?",
    answers: [
      "Yes, most processes depend on individuals (Not fulfilled)",
      "Some processes are informally shared but undocumented",
      "A few SOPs exist but coverage is partial",
      "Most processes are documented, few knowledge silos remain",
      "All processes documented and knowledge widely shared"
    ]
  },
  {
    part: "Part 1 – SOP Generator",
    q: "When a new hire joins, how do they learn the ropes?",
    answers: [
      "No structured onboarding, learning by trial & error (Not fulfilled)",
      "New hires rely on shadowing peers",
      "Some training materials exist, but incomplete",
      "Formal onboarding sessions for key functions",
      "Comprehensive onboarding with SOPs, mentors, and training"
    ]
  },
  {
    part: "Part 2 – Role Clarity Dashboard",
    q: "How are roles and responsibilities currently assigned?",
    answers: [
      "No clarity, roles overlap or are undefined (Not fulfilled)",
      "Roles given verbally, without written job descriptions",
      "Job descriptions exist but are outdated",
      "Clear roles documented for most staff",
      "All roles are clearly defined, updated, and aligned with strategy"
    ]
  },
  {
    part: "Part 2 – Role Clarity Dashboard",
    q: "Are there areas where people are unsure about their duties or decision-making powers?",
    answers: [
      "Yes, widespread confusion about responsibilities (Not fulfilled)",
      "Some uncertainty in overlapping roles",
      "Most people know their roles, but escalation is unclear",
      "Duties and authority are clear with minor exceptions",
      "Everyone fully understands scope of work and authority limits"
    ]
  },
  {
    part: "Part 3 – Task Ownership Tracker",
    q: "How do you keep track of tasks once they've been assigned?",
    answers: [
      "No formal tracking, depends on individuals (Not fulfilled)",
      "Tasks tracked informally through chats/emails",
      "Basic spreadsheets or ad-hoc lists used",
      "Centralized task tracker/project management tool exists",
      "Fully integrated system with reminders and accountability"
    ]
  },
  {
    part: "Part 3 – Task Ownership Tracker",
    q: "What's the biggest reason tasks get delayed or missed?",
    answers: [
      "No accountability or ownership (Not fulfilled)",
      "Poor communication or unclear instructions",
      "Lack of deadlines/prioritization",
      "Resource constraints occasionally cause delays",
      "Delays are rare, risks proactively managed"
    ]
  },
  {
    part: "Part 4 – Performance Feedback Loop",
    q: "How often do you hold review meetings or give feedback?",
    answers: [
      "No structured reviews or feedback (Not fulfilled)",
      "Feedback is irregular and ad-hoc",
      "Periodic reviews but inconsistent",
      "Monthly or quarterly structured reviews",
      "Regular ongoing feedback supported by formal systems"
    ]
  },
  {
    part: "Part 4 – Performance Feedback Loop",
    q: "Is feedback mostly formal, informal, or ad-hoc?",
    answers: [
      "No feedback culture at all (Not fulfilled)",
      "Feedback only in emergencies or issues",
      "Mostly informal conversations",
      "Structured reviews with some informal input",
      "Balanced system with formal + informal continuous feedback"
    ]
  },
  {
    part: "Part 5 – AI Process Auditor",
    q: "Which part of your workflow feels the slowest or most error-prone?",
    answers: [
      "We don't track bottlenecks at all (Not fulfilled)",
      "Staff observations only, no analysis",
      "Some data collected but not reviewed regularly",
      "Known bottlenecks addressed occasionally",
      "Continuous monitoring and improvement in place"
    ]
  },
  {
    part: "Part 5 – AI Process Auditor",
    q: "Are there tasks you wish could be automated or checked automatically?",
    answers: [
      "We haven't considered automation (Not fulfilled)",
      "Aware of automation needs but no action",
      "Some tools tried but not fully implemented",
      "Partial automation of repetitive tasks",
      "High automation and regular AI/process reviews"
    ]
  },
  {
    part: "Part 6 – KPI Health Check",
    q: "Which key metrics or KPIs do you monitor regularly?",
    answers: [
      "No KPIs monitored (Not fulfilled)",
      "Only financial KPIs tracked",
      "Some operational KPIs but inconsistent",
      "Financial + operational KPIs tracked regularly",
      "Balanced scorecard (finance, operations, customer, people)"
    ]
  },
  {
    part: "Part 6 – KPI Health Check",
    q: "How often do you review them, and in what format?",
    answers: [
      "No regular KPI reviews (Not fulfilled)",
      "Reviewed occasionally via spreadsheets",
      "Monthly review meetings, mostly static reports",
      "Dashboards reviewed weekly",
      "Real-time dashboard with continuous insights"
    ]
  },
  {
    part: "Part 7 – Smart Action Planner",
    q: "Who decides the steps after a strategy or idea is approved?",
    answers: [
      "No structured decision-making (Not fulfilled)",
      "Decisions depend on top management only",
      "Department heads define next steps",
      "Joint leadership involvement with cross-functional input",
      "Structured governance process with clear accountability"
    ]
  },
  {
    part: "Part 7 – Smart Action Planner",
    q: "How do you ensure those steps are actually completed?",
    answers: [
      "No follow-up or monitoring (Not fulfilled)",
      "Occasional follow-up by management",
      "Deadlines exist but often missed",
      "Regular check-ins and escalation mechanisms",
      "Task completion systematically tracked with accountability"
    ]
  },
  {
    part: "Part 8 – Revenue Leak Analyzer",
    q: "Have you spotted recurring situations where you lose revenue or miss opportunities?",
    answers: [
      "No tracking of revenue leaks (Not fulfilled)",
      "Aware but no structured tracking",
      "Informal tracking of major issues",
      "Periodic analysis of revenue leakage",
      "Continuous monitoring with prevention strategies"
    ]
  },
  {
    part: "Part 8 – Revenue Leak Analyzer",
    q: "How do you currently track and address these losses?",
    answers: [
      "We don't track losses (Not fulfilled)",
      "Only react when issues are large",
      "Ad-hoc tracking with spreadsheets",
      "Dedicated team reviews leaks quarterly",
      "Automated system flags & prevents leakages"
    ]
  },
  {
    part: "Part 9 – Benchmarking Assistant",
    q: "Do you compare your performance, processes, or KPIs to industry standards?",
    answers: [
      "No benchmarking done (Not fulfilled)",
      "Occasionally look at competitors informally",
      "Some benchmarking studies done irregularly",
      "Regular benchmarking for key metrics",
      "Continuous benchmarking against best-in-class"
    ]
  },
  {
    part: "Part 9 – Benchmarking Assistant",
    q: "Where do you think you're ahead, and where could you catch up?",
    answers: [
      "We don't know our position (Not fulfilled)",
      "Some strengths known, but no clarity on weaknesses",
      "Aware of broad areas to improve but no detail",
      "Clear on key strengths and priority gaps",
      "Detailed benchmarking matrix of strengths & gaps"
    ]
  }
];

function App() {
  const [responses, setResponses] = useState({});
  const [showResults, setShowResults] = useState(false);

  // Initialize responses state
  useEffect(() => {
    const initialResponses = {};
    QUESTIONS.forEach((_, index) => {
      initialResponses[index] = { selectedIndex: null };
    });
    setResponses(initialResponses);
  }, []);

  const handleAnswerChange = useCallback((questionIndex, answerIndex, isChecked) => {
    setResponses(prev => {
      const newResponses = { ...prev };
      
      if (answerIndex === 0) {
        // "Not fulfilled" option selected
        if (isChecked) {
          newResponses[questionIndex] = { selectedIndex: 0 };
        } else {
          newResponses[questionIndex] = { selectedIndex: null };
        }
      } else {
        // Other options
        if (isChecked) {
          newResponses[questionIndex] = { selectedIndex: answerIndex };
        } else {
          newResponses[questionIndex] = { selectedIndex: null };
        }
      }
      
      return newResponses;
    });
  }, []);

  const getAnsweredCount = () => {
    return Object.values(responses).filter(r => r.selectedIndex !== null).length;
  };

  const getScore = () => {
    let total = 0;
    const maxPoints = QUESTIONS.length * 4;
    
    Object.values(responses).forEach(response => {
      if (response.selectedIndex !== null && response.selectedIndex !== 0) {
        total += response.selectedIndex;
      }
    });
    
    return {
      totalPoints: total,
      maxPoints: maxPoints,
      percentage: maxPoints === 0 ? 0 : Math.round((total / maxPoints) * 100)
    };
  };

  const getAnalysis = () => {
    const score = getScore();
    const redFlags = Object.values(responses).filter(r => r.selectedIndex === 0).length;
    const completion = getAnsweredCount();

    // Per part analysis
    const perPart = {};
    QUESTIONS.forEach((q, index) => {
      const response = responses[index];
      if (!perPart[q.part]) {
        perPart[q.part] = { count: 0, points: 0, red: 0 };
      }
      perPart[q.part].count++;
      
      if (response && response.selectedIndex === 0) {
        perPart[q.part].red++;
      } else if (response && response.selectedIndex !== null) {
        perPart[q.part].points += response.selectedIndex;
      }
    });

    Object.keys(perPart).forEach(key => {
      const p = perPart[key];
      p.max = p.count * 4;
      p.pct = p.max ? Math.round((p.points / p.max) * 100) : 0;
    });

    return { score, redFlags, completion, perPart };
  };

  const getGrade = (percentage) => {
    if (percentage >= 85) return { label: 'Optimized', cls: 'opt' };
    if (percentage >= 70) return { label: 'Strong', cls: 'str' };
    if (percentage >= 50) return { label: 'Developing', cls: 'dev' };
    return { label: 'Foundational', cls: 'fnd' };
  };

  const handleSubmit = () => {
    const answeredCount = getAnsweredCount();
    if (answeredCount < QUESTIONS.length) {
      alert('Please answer all questions before submitting.');
      return;
    }

    try {
      localStorage.setItem('module1Results', JSON.stringify({
        results: Object.entries(responses).map(([index, response]) => ({
          index: parseInt(index) + 1,
          part: QUESTIONS[index].part,
          question: QUESTIONS[index].q,
          selectedIndex: response.selectedIndex,
          selectedLabel: QUESTIONS[index].answers[response.selectedIndex]
        }))
      }));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }

    setShowResults(true);
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleReset = () => {
    const resetResponses = {};
    QUESTIONS.forEach((_, index) => {
      resetResponses[index] = { selectedIndex: null };
    });
    setResponses(resetResponses);
    setShowResults(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const answeredCount = getAnsweredCount();
  const score = getScore();
  const progressPercentage = Math.round((answeredCount / QUESTIONS.length) * 100);

  return (
    <div className="App">
      <header>
        <div className="wrap">
          <h1>Module 1 – Operational Maturity Survey (19 Questions)</h1>
          <p>Answer all 19 questions. Selecting "Not fulfilled" disables others. Among remaining, only one may be selected.</p>
          <div className="statusbar">
            <span className="pill">Completed: {answeredCount} / {QUESTIONS.length}</span>
            <span className="pill">Maturity Score: <strong>{score.percentage}%</strong></span>
            <div className="progress">
              <div className="bar" style={{ width: `${progressPercentage}%` }}></div>
            </div>
          </div>
        </div>
      </header>

      <main className="wrap">
        {QUESTIONS.map((question, qIndex) => (
          <div key={qIndex} className="card">
            <div className="q-title">
              <span className="badge">{question.part}</span>
              <span className="badge">Q{qIndex + 1}</span>
              <br />
              {question.q}
            </div>
            <div className="answers">
              {question.answers.map((answer, aIndex) => {
                const isSelected = responses[qIndex]?.selectedIndex === aIndex;
                const isNotFulfilled = aIndex === 0;
                const isDisabled = responses[qIndex]?.selectedIndex === 0 && aIndex !== 0;
                
                return (
                  <label
                    key={aIndex}
                    className={`answer ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''} ${isNotFulfilled ? 'nf' : ''}`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      disabled={isDisabled}
                      onChange={(e) => handleAnswerChange(qIndex, aIndex, e.target.checked)}
                    />
                    <span>{answer}</span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </main>

      <section className="wrap">
        <div className="toolbar">
          <button
            className="success"
            disabled={answeredCount < QUESTIONS.length}
            onClick={handleSubmit}
          >
            Submit Module 1
          </button>
          <button className="secondary" onClick={handleReset}>
            Reset
          </button>
        </div>
      </section>

      {showResults && (
        <section className="wrap results show" id="results">
          <ResultsDisplay analysis={getAnalysis()} />
        </section>
      )}
    </div>
  );
}

function ResultsDisplay({ analysis }) {
  const { score, redFlags, completion, perPart } = analysis;
  const grade = getGrade(score.percentage);

  const getGrade = (percentage) => {
    if (percentage >= 85) return { label: 'Optimized', cls: 'opt' };
    if (percentage >= 70) return { label: 'Strong', cls: 'str' };
    if (percentage >= 50) return { label: 'Developing', cls: 'dev' };
    return { label: 'Foundational', cls: 'fnd' };
  };

  const getNarrative = () => {
    let narrative = '';
    if (grade.label === 'Foundational') {
      narrative = 'Your operation relies on individuals more than systems. Establishing simple, repeatable routines will quickly stabilize performance.';
    } else if (grade.label === 'Developing') {
      narrative = 'Momentum is building, but uneven practices slow execution. Closing the gaps will boost predictability and speed.';
    } else if (grade.label === 'Strong') {
      narrative = 'Strong foundations are in place. Targeted refinements will improve resilience and scale.';
    } else {
      narrative = 'Practices are mature. Keep fine‑tuning to avoid hidden inefficiencies and sustain your lead.';
    }
    narrative += ` Red‑flag items identified: ${redFlags}.`;
    return narrative;
  };

  return (
    <>
      <div className="card">
        <h2 style={{ margin: '0 0 10px' }}>Company Diagnostic Summary</h2>
        <div>
          <span className="pill">Maturity: <strong>{score.percentage}%</strong></span>
          <span className="pill">Status: <strong className={`status ${grade.cls}`}>{grade.label}</strong></span>
          <span className="pill">Red flags: <strong>{redFlags}</strong></span>
          <span className="pill">Completion: <strong>{completion} / {QUESTIONS.length}</strong></span>
        </div>
        <div className="chips">
          {Object.keys(perPart).map(partName => {
            const p = perPart[partName];
            const parts = partName.split('–');
            const label = parts.length > 1 ? parts[1].trim() : partName;
            return (
              <span key={partName} className="chip">
                {label}: {p.pct}% (red: {p.red}/{p.count})
              </span>
            );
          })}
        </div>
      </div>
      
      <div className="card">
        <h3 style={{ margin: '0 0 8px' }}>Key Findings</h3>
        <ul style={{ margin: 0, paddingLeft: '18px' }}>
          {redFlags === 0 && score.percentage >= 85 ? (
            <li>Practices are consistent and well-embedded across teams.</li>
          ) : (
            <li>Focus improvements on sections showing lower percentages and any Not fulfilled responses.</li>
          )}
        </ul>
      </div>
      
      <div className="card">
        <h3 style={{ margin: '0 0 8px' }}>Narrative</h3>
        <p style={{ margin: 0 }}>{getNarrative()}</p>
      </div>
    </>
  );
}

export default App;