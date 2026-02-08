import { Book, Briefcase, Code, GraduationCap, Trophy, User } from "lucide-react";

export const resumeData = {
  personalInfo: {
    name: "Bhuman Pandita",
    title: "Data Scientist | Agentic AI & Deep Learning Enthusiast",
    email: "bhumanpandita4@gmail.com",
    location: "Bengaluru, Karnataka, India",
    linkedin: "https://www.linkedin.com/in/bhumanpandita",
    github: "https://github.com/BhumanPandita",
    bio: "I'm a Data Scientist at IndiGo's R&D lab (Lab37), building technology for the future of aviation. I specialize in Agentic AI, Deep Learning, and solving complex operational challenges. Published author and winner of multiple tech competitions.",
    avatar: "/placeholder-avatar.jpg",
  },
  education: [
    {
      school: "Birla Institute of Technology and Science Pilani (BITS Pilani)",
      degree: "Bachelor of Engineering in Civil (Hons.) + Minor in Data Science",
      year: "2021 - 2025",
      grade: "CGPA 7.8/10",
      description: "Focus on Data Science, Machine Learning, and Engineering fundamentals."
    },
    {
      school: "Narayana Junior College, Nallakunta",
      degree: "Intermediate",
      year: "2020 - 2021"
    },
    {
      school: "Delhi Public School - India",
      degree: "High School",
      year: "2018 - 2019"
    }

  ],
  experience: [
    {
      company: "IndiGo (InterGlobe Aviation Ltd)",
      role: "Data Scientist (IAL)",
      period: "June 2025 - Present",
      description: "Working at Lab37 to build futuristic aviation tech.",
      highlights: [
        "Designed and deployed an AI agent-driven MCP server for automating Bluechip profile updates across multiple internal databases, cutting TAT from 12 days to under 1 minute.",
        "Integrated intelligent workflow orchestration enabling consistent and error-free data synchronization.",
        "Collaborated with business and IT stakeholders to standardize update logic and ensure compliance."
      ]
    },
    {
      company: "Swostitech Solutions",
      role: "AI Engineer Intern",
      period: "Dec 2024 - Jan 2025",
      description: "Focused on RAG and LLM optimization.",
      highlights: [
        "Implemented Retrieval-Augmented Generation (RAG) for 1,000+ documents, optimizing retrieval accuracy across OpenAI, LLaMA, and Mistral models.",
        "Improved retrieval speed by 30% via model fine-tuning and benchmarking."
      ]
    },
    {
      company: "Rigi",
      role: "Data Analyst Intern",
      period: "July 2024 - Dec 2024",
      description: "Data automation and insights.",
      highlights: [
        "Automated creation of large Excel reports for 100+ creators, cutting manual effort by 50%.",
        "Optimized complex SQL queries reducing dashboard query time by 30% and unlocking actionable insights via Metabase."
      ]
    },
    {
      company: "Ministry of Education, Government of India",
      role: "Summer Intern",
      period: "May 2024 - July 2024",
      highlights: [
        "Applied state-of-the-art panoptic and semantic segmentation techniques to high-resolution imagery.",
        "Researched and implemented various methodologies enhancing remote sensing data visualization."
      ]
    },
    {
      company: "Wadia Institute of Himalayan Geology",
      role: "Summer Intern",
      period: "May 2023 - July 2023",
      highlights: [
        "Created a flood warning system using machine learning techniques in R.",
        "Incorporated variables such as monthly and annual rainfall indexes to analyse historical flood data."
      ]
    }
  ],
  projects: [
    {
      title: "SWOT Analysis Generator",
      slug: "swot-analysis-generator",
      technologies: ["LangChain", "Python", "Google Gemini", "Streamlit"],
      period: "Oct 2024 - Oct 2024",
      description: "A powerful and user-friendly tool leveraging LangChain and Gemini to facilitate dynamic strategic assessments.",
      fullDescription: "Empower your decision-making with AI-driven insights for comprehensive analyses. This tool automates the SWOT analysis process, providing strategic recommendations based on user input.",
      image: "/swot_analysis_real_1770478345192.png",
      github: "https://github.com/BhumanPandita"
    },
    {
      title: "Wheat Rust Detection using AI",
      slug: "wheat-rust-detection",
      technologies: ["Deep Learning", "PyTorch", "ResNet", "EfficientNet"],
      period: "Dec 2023 - May 2024",
      description: "Achieved 98.33% validation accuracy in wheat disease classification using extensive data augmentation.",
      fullDescription: "Conducted a comparative evaluation of advanced deep learning architectures (ResNet, EfficientNet, VGG, Inception, MobileNet, DenseNet). The developed model outperforms existing architectures, demonstrating notable improvements in precision, recall, and F1 scores.",
      image: "/wheat_rust_real_1770478364142.png",
      github: "https://github.com/BhumanPandita"
    },
    {
      title: "CycleGAN-based Dehazing",
      slug: "cyclegan-dehazing",
      technologies: ["Deep Learning", "CycleGAN", "PyTorch"],
      period: "Mar 2024 - Apr 2024",
      description: "Developed a CycleGAN model for image dehazing, learning mappings between unpaired image domains.",
      fullDescription: "Developed a CycleGAN model for image dehazing, leveraging its ability to learn mappings between unpaired image domains while enforcing cycle consistency and adversarial training. Explored the impact of data augmentation techniques on improving image quality and generalization. Implemented the model from scratch without using any pre-trained weights, showcasing a deep understanding of the underlying principles.",
      image: "/dehazing_real_1770478400196.png",
      github: "https://github.com/BhumanPandita/CycleGAN-Dehazing"
    },
    {
      title: "Meeting Summariser App",
      slug: "meeting-summariser",
      technologies: ["OpenAI Whisper", "GPT", "Python", "Streamlit"],
      period: "Oct 2024 - Nov 2024",
      description: "Built a Streamlit-based meeting summarizer achieving 95% transcription accuracy and generating concise summaries.",
      fullDescription: "A powerful tool that leverages OpenAI's Whisper model for high-accuracy speech-to-text transcription and GPT-4 for generating intelligent meeting minutes. The app supports various audio formats and provides real-time summarization with actionable items.",
      image: "/meeting_summarizer_real_1770478383269.png",
      github: "https://github.com/BhumanPandita/MeetingSummariser"
    },
    {
      title: "CNN-Based Sound Classification",
      slug: "sound-classification",
      technologies: ["CNN", "ResNet", "DenseNet", "Librosa"],
      period: "Jan 2024 - Mar 2024",
      description: "Designed CNN architectures to classify 13 sound classes with high accuracy. Preprocessed 6000+ audio samples.",
      fullDescription: "A comprehensive study on audio classification using Deep Learning. Implemented and benchmarked various CNN architectures including ResNet and DenseNet on a large dataset of environmental sounds. Utilized Librosa for extracting Mel-spectrogram features.",
      image: "/sound_class_real_v2_1770478989600.png",
      github: "https://github.com/BhumanPandita/Audio-Classification"
    }
  ],
  skills: [
    "Python", "R", "PostgreSQL",
    "Semantic-Kernel", "Autogen", "LangChain", "FastAPI", "FastMCP", "PyTorch", "TensorFlow",
    "MCP Servers", "AI Agents", "Streamlit",
    "Metabase", "Power BI", "Tableau", "Docker", "Git",
    "Decision-Making", "Inductive Transfer", "Machine Learning"
  ],
  publications: [
    {
      title: "Integrating deep learning for visual question answering in Agricultural Disease Diagnostics",
      journal: "Scientific Reports",
      year: "2024",
      link: "#"
    },
    {
      title: "Efficacy of biochar as a catalyst for a Fenton-like reaction",
      journal: "Journal of Water Process Engineering",
      year: "2025",
      link: "#"
    },
    {
      title: "Optimizing the upcycling of microplastics to a carbon-based adsorbent",
      journal: "Chemical Engineering Science",
      year: "2026",
      link: "#"
    }
  ],
  awards: [
    {
      title: "UG Event ASCE International Conference",
      organization: "ASCE Indian Section",
      date: "Feb 2025",
      description: "Received 1st Prize for research on AI-Powered UAV Crop Disease Diagnostics for Smart Cities of Tomorrow."
    },
    {
      title: "Amazon ML Challenge 2024",
      organization: "Amazon",
      date: "2024",
      description: "Top 166th rank out of 75,000+ registered participants."
    }
  ],
  recommendations: [
    {
      name: "Shubham Bhardwaj",
      role: "Data Science & Analytics @ Postman",
      content: "Bhuman worked with me @ Rigi as a Data Analyst Intern and showed impressive attention to detail working alongside me on our newly launched Gap Up App. His eagerness to learn and ability to pickup new technical skills would make him a valuable asset to any organisation."
    }
  ]
};
