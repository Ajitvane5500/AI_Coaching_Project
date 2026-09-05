import streamlit as st
import requests

# Render वरील आपल्या बॅकएंडची लाईव्ह URL
BACKEND_URL = "https://ai-coaching-project.onrender.com"

st.set_page_config(page_title="AI Coaching Platform", layout="wide")

st.title("🎓 AI Coaching Intelligence Platform")
st.write("Welcome to the Student & Teacher Dashboard")

# साइडबार मेनू
menu = st.sidebar.selectbox("Navigation", ["Home", "Student Dashboard", "Teacher Dashboard", "Admin Analytics"])

if menu == "Home":
    st.subheader("System Status")
    try:
        response = requests.get(f"{BACKEND_URL}/")
        if response.status_code == 200:
            st.success(response.json().get("message", "Connected successfully!"))
        else:
            st.error("Backend is running but returned an error.")
    except Exception as e:
        st.error(f"Could not connect to backend: {e}")

elif menu == "Student Dashboard":
    st.subheader("Student Profiling & Dashboard")
    student_id = st.number_input("Enter Student ID", min_value=1, step=1, value=1)
    
    if st.button("Get Student Dashboard"):
        try:
            res = requests.get(f"{BACKEND_URL}/students/{student_id}/dashboard")
            if res.status_code == 200:
                st.json(res.json())
            else:
                st.warning("Student data not found or error occurred.")
        except Exception as e:
            st.error(f"Error: {e}")

elif menu == "Teacher Dashboard":
    st.subheader("Teacher Analytics & Class Overview")
    if st.button("Load Teacher Dashboard"):
        try:
            res = requests.get(f"{BACKEND_URL}/teacher/dashboard")
            if res.status_code == 200:
                data = res.json()
                st.metric("Total Enrolled Students", data.get("total_enrolled_students", 0))
                st.metric("Active Question Bank Items", data.get("active_question_bank_items", 0))
                st.metric("Class Average Readiness", data.get("class_average_readiness", "0%"))
            else:
                st.error("Failed to fetch teacher dashboard.")
        except Exception as e:
            st.error(f"Error: {e}")

elif menu == "Admin Analytics":
    st.subheader("System Administration & Analytics")
    if st.button("Load Admin Analytics"):
        try:
            res = requests.get(f"{BACKEND_URL}/admin/analytics")
            if res.status_code == 200:
                st.json(res.json())
            else:
                st.error("Failed to fetch admin data.")
        except Exception as e:
            st.error(f"Error: {e}")