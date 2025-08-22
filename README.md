# 🔥 Forest Fire Detection System

A comprehensive machine learning-based web application for predicting forest fire risks in Algeria using environmental factors such as temperature, humidity, wind conditions, and rainfall.

## 🌟 Features

### **ML-Powered Predictions**
- **Binary Classification Model**: Advanced machine learning algorithm for accurate fire risk assessment
- **Real-time Analysis**: Instant predictions based on environmental parameters
- **Risk Level Classification**: FIRE and NO FIRE risk categories

### **Interactive Dashboard**
- **Prediction History**: Track all your previous predictions with detailed analytics
- **Data Visualization**: Beautiful charts showing temperature trends, Fire Weather Index patterns, and risk distribution
- **Summary Statistics**: Total predictions, average FWI, highest/lowest FWI scores
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### **User Experience**
- **Smooth Navigation**: GSAP-powered smooth scrolling between dashboard sections
- **Active Page Indicators**: Clear navigation showing current page
- **Custom Scrollbars**: Beautiful, dark-themed scrollbars for better visibility
- **Hover Effects**: Interactive elements with smooth transitions and animations

### **Data Management**
- **Local Storage**: Secure storage of user prediction history
- **Data Persistence**: Predictions saved locally for privacy and convenience
- **Export Ready**: Structured data format for future analysis

## 🏗️ Project Structure

```
ML Project 1/
├── Backend/                          # Python Flask Backend
│   ├── app.py                       # Main Flask application
│   ├── src/                         # Source code
│   │   ├── logger.py               # Logging configuration
│   │   ├── exception.py            # Custom exception handling
│   │   ├── utils.py                # Utility functions
│   │   └── pipeline/               # ML pipeline
│   │       ├── predict_pipeline.py # Prediction pipeline
│   │       └── ...                 # Other pipeline components
│   ├── notebooks/                  # Jupyter notebooks
│   │   ├── 1.EDA&FeatureEngi.ipynb # Exploratory Data Analysis
│   │   ├── 2.ModelTraining.ipynb   # Model Training
│   │   └── Algerian_forest_fires_clean_dataset.csv
│   ├── requirements.txt            # Python dependencies
│   ├── setup.py                    # Package setup
│   └── ...                         # Other backend files
│
└── Frontend/                        # Next.js Frontend
    ├── src/
    │   ├── app/                     # Next.js App Router
    │   │   ├── page.js             # Home page with prediction form
    │   │   ├── about/page.js       # About page
    │   │   ├── dashboard/page.js   # Dashboard with charts
    │   │   └── ...                 # Other app pages
    │   └── Components/              # React components
    │       ├── Form.jsx            # Prediction form
    │       ├── Navigation.jsx      # Navigation bar
    │       ├── DashboardChart.jsx  # Custom chart components
    │       └── ...                 # Other components
    ├── public/                      # Static assets
    ├── package.json                 # Node.js dependencies
    ├── next.config.mjs             # Next.js configuration
    └── ...                         # Other frontend files
```

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+ and npm
- Python 3.8+
- Modern web browser

### **Frontend Setup**

1. **Navigate to Frontend directory**
   ```bash
   cd Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### **Backend Setup**

1. **Navigate to Backend directory**
   ```bash
   cd Backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scriptsctivate
   ```

3. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Install the package**
   ```bash
   pip install -e .
   ```

5. **Run Flask application**
   ```bash
   python app.py
   ```

## 📱 How to Use

### **1. Make a Prediction**
- Navigate to the home page
- Fill in environmental parameters:
  - **Temperature** (°C)
  - **Relative Humidity** (%)
  - **Wind Speed** (km/h)
  - **Rainfall** (mm)
  - **FFMC, DMC, DC, ISI, BUI, FWI** (Fire Weather Index)
  - **Region** selection (Bejaia or Sidi-Bel-Abbes)
- Click "Predict Fire Risk" to get instant fire risk assessment

### **2. View Dashboard**
- Click "Dashboard" in navigation
- View your prediction history
- Analyze trends with interactive charts
- Check summary statistics

### **3. Navigate Between Sections**
- Use quick navigation buttons (Summary, Charts, History)
- Smooth scrolling between dashboard sections
- Active page indicators in navigation

## 🛠️ Technologies Used

### **Frontend**
- **Next.js 15**: React framework with App Router
- **React 19**: JavaScript library for building user interfaces
- **Tailwind CSS**: Utility-first CSS framework
- **GSAP**: High-performance animations and smooth scrolling

### **Backend**
- **Python Flask**: Lightweight web framework
- **Scikit-learn**: Machine learning library
- **Hugging Face Hub**: Model hosting and deployment
- **CatBoost & XGBoost**: ML algorithms for fire risk prediction
- **Flask-CORS**: Cross-Origin Resource Sharing support

### **Data & ML**
- **Algerian Forest Fires Dataset**: Historical fire data
- **Feature Engineering**: Advanced data preprocessing
- **Model Training**: Jupyter notebooks for ML pipeline
- **Model Deployment**: Using Hugging Face Hub for model hosting

## 📊 Machine Learning Model

### **Algorithm**: Binary Classification
- **Type**: Classification model predicting FIRE or NO FIRE
- **Purpose**: Predict forest fire occurrence based on environmental factors
- **Features**: Temperature, humidity, wind, rainfall, fire weather indices (FFMC, DMC, DC, ISI, BUI, FWI)
- **Output**: Binary classification (0: FIRE, 1: NO FIRE)

### **Model Performance**
- **Training Data**: Historical Algerian forest fire records
- **Validation**: Cross-validation for robust performance
- **Deployment**: Hosted on Hugging Face Hub for easy access
- **Integration**: Seamlessly integrated with Flask backend

## 🎨 Custom Features

### **Smooth Scrolling**
- GSAP-powered smooth section navigation
- Custom easing functions for natural movement
- Fallback to native smooth scrolling

### **Custom Scrollbars**
- Dark-themed scrollbars for better visibility
- Webkit and Firefox compatibility
- Hover effects and smooth transitions

### **Responsive Design**
- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly interactions

## 🔧 Configuration

### **Environment Variables**
```bash
# Frontend
NEXT_PUBLIC_API_URL=https://algerian-forest-fire-prediction-j2i8.onrender.com

# Backend
FLASK_ENV=development
FLASK_DEBUG=1
HF_MODEL_REPO=your-huggingface-repo
HF_MODEL_FILENAME=model.pkl
HF_PREPROCESSOR_FILENAME=preprocessor.pkl
HF_MODEL_REVISION=main
HF_TOKEN=your-huggingface-token
```

### **Customization**
- **Colors**: Modify Tailwind CSS classes
- **Animations**: Adjust GSAP timing and easing
- **Charts**: Customize chart colors and styles
- **Scrollbars**: Modify scrollbar appearance in global styles

## 🚀 Deployment

### **Frontend (Vercel/Netlify)**
1. Connect your GitHub repository
2. Build command: `npm run build`
3. Output directory: `.next`
4. Deploy automatically on push

### **Backend (Render/Railway)**
1. Upload Backend folder
2. Install Python dependencies
3. Set environment variables
4. Deploy Flask application

### **Model Deployment (Hugging Face Hub)**
1. Train and save your model
2. Upload model and preprocessor to Hugging Face Hub
3. Configure environment variables for model access
4. Integrate with Flask backend

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Dataset**: Algerian Forest Fires Dataset
- **ML Framework**: Scikit-learn, CatBoost, and XGBoost communities
- **Frontend**: Next.js and React communities
- **Animations**: GSAP team for smooth scrolling
- **Model Hosting**: Hugging Face for model deployment

## 📞 Support

For questions or support:
- Create an issue on GitHub
- Check the documentation
- Review the code comments

---

**Made with ❤️ for forest fire prevention and environmental safety**