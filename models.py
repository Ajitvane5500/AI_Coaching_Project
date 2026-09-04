from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Student(Base):
    __tablename__ = "students"
    __table_args__ = {'extend_existing': True}

    student_id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    exam = Column(String)
    target_score = Column(Float)
    target_date = Column(String)
    available_hours = Column(Float)

class Question(Base):
    __tablename__ = "questions"
    __table_args__ = {'extend_existing': True}

    question_id = Column(Integer, primary_key=True, index=True)
    subject = Column(String, index=True)
    chapter = Column(String, index=True)
    question_text = Column(String, nullable=False)
    correct_answer = Column(String, nullable=False)
    explanation = Column(String)
    difficulty = Column(String, default="Medium")

    options = relationship("QuestionOption", back_populates="question")
    attempts = relationship("Attempt", back_populates="question")

class QuestionOption(Base):
    __tablename__ = "question_options"
    __table_args__ = {'extend_existing': True}

    option_id = Column(Integer, primary_key=True, index=True)
    question_id = Column(Integer, ForeignKey("questions.question_id"))
    option_text = Column(String, nullable=False)

    question = relationship("Question", back_populates="options")

class Attempt(Base):
    __tablename__ = "attempts"
    __table_args__ = {'extend_existing': True}

    attempt_id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.student_id"))
    question_id = Column(Integer, ForeignKey("questions.question_id"))
    selected_answer = Column(String)
    is_correct = Column(Integer)  # 1 म्हणजे बरोबर, 0 म्हणजे चुकीचे
    score = Column(Float, default=0.0)

    question = relationship("Question", back_populates="attempts")