// VI / EN interface translation, independent of the exam engine.
const UI_VI = {"Home": "Trang chủ", "Materials": "Tài liệu", "HSK Practice": "Luyện HSK", "CHINESE LANGUAGE LEARNING": "LUYỆN TIẾNG TRUNG", "HSK Practice & Mock Exams": "Luyện tập & Thi thử HSK", "Structured exercises, question-by-question feedback and timed exam practice.": "Luyện từng câu, xem giải thích và thi thử có giới hạn thời gian.", "Listening · Reading · Writing · Speaking": "Nghe · Đọc · Viết · Nói", "Original practice questions": "Câu hỏi luyện tập tự biên soạn", "Choose your level": "Chọn cấp độ HSK", "Select the level you want to work on.": "Chọn trình độ phù hợp với bạn.", "BEGINNER": "CƠ BẢN", "ELEMENTARY": "SƠ CẤP", "INTERMEDIATE": "TRUNG CẤP", "UPPER INTERMEDIATE": "TRUNG CAO CẤP", "Foundation": "Nền tảng", "Everyday language": "Giao tiếp hằng ngày", "Practical communication": "Giao tiếp thực tế", "Advanced situations": "Tình huống nâng cao", "Choose your study mode": "Chọn chế độ học", "Learn at your pace or practice under time pressure.": "Luyện theo tốc độ của bạn hoặc thi thử có tính giờ.", "LEARN & REVIEW": "LUYỆN TẬP", "Practice Mode": "Luyện tập", "One question at a time. Check answers and explanations immediately.": "Làm từng câu, kiểm tra đáp án và xem giải thích ngay.", "EXAM SIMULATION": "THI THỬ", "Mock Exam": "Thi thử", "Timed questions, answer navigation, submission and detailed review.": "Có đồng hồ, chuyển câu, nộp bài và xem lại kết quả.", "Choose a skill": "Chọn kỹ năng", "Currently selected:": "Đang chọn:", "01 / AUDIO": "01 / NGHE", "02 / TEXT": "02 / ĐỌC", "03 / SENTENCES": "03 / VIẾT", "04 / PRONUNCIATION": "04 / NÓI", "Listening": "Nghe hiểu", "Reading": "Đọc hiểu", "Writing": "Viết", "Speaking": "Nói", "Hear Chinese and select answers": "Nghe tiếng Trung và chọn đáp án", "Read and understand Chinese": "Đọc và hiểu nội dung tiếng Trung", "Type Chinese answers": "Nhập câu trả lời bằng tiếng Trung", "Listen, record and compare": "Nghe mẫu, ghi âm và đối chiếu", "READY TO BEGIN?": "SẴN SÀNG BẮT ĐẦU?", "Timed HSK practice exam": "Bài thi thử HSK có tính giờ", "Complete listening, reading and writing questions. You can move between questions and submit when ready. Answers are revealed only after submission.": "Làm các phần Nghe, Đọc và Viết. Có thể chuyển câu và nộp bài khi hoàn tất. Đáp án chỉ hiện sau khi nộp.", "This is an original shortened practice simulation, not an official or full-length HSK examination.": "Đây là đề luyện rút gọn tự biên soạn, không phải đề HSK chính thức.", "Start mock exam →": "Bắt đầu thi thử →", "Listening uses your browser's Chinese text-to-speech voice, not the publisher's audio. Speaking is self-assessed. HSK 1–3 task formats are informed by the supplied sample books, which use an older HSK exam format.": "Phần nghe dùng giọng đọc tiếng Trung của trình duyệt, không phải audio gốc. Phần nói tự đánh giá. Một số dạng bài tham khảo tài liệu HSK phiên bản cũ.", "MOCK EXAM": "THI THỬ", "PRACTICE": "LUYỆN TẬP", "Time remaining": "Thời gian còn lại", "Play listening": "Phát bài nghe", "Listen to example": "Nghe mẫu", "Question navigator": "Danh sách câu hỏi", "Submit exam": "Nộp bài", "Check answer": "Kiểm tra đáp án", "Next question →": "Câu tiếp theo →", "Review / Finish": "Xem lại / Kết thúc", "← Previous": "← Câu trước", "Correct answer": "Đáp án đúng", "Review your answer": "Xem lại câu trả lời", "Sample answer": "Câu trả lời mẫu", "Record": "Ghi âm", "Stop": "Dừng", "Session complete": "Hoàn thành bài luyện", "Answer review": "Xem lại đáp án", "Practice again": "Luyện lại", "Close": "Đóng", "Your answer:": "Câu trả lời của bạn:", "Correct answer:": "Đáp án đúng:", "Not answered": "Chưa trả lời", "Speaking is self-assessed.": "Phần nói do bạn tự đánh giá."};
const UI_EN = Object.fromEntries(Object.entries(UI_VI).map(([en,vi])=>[vi,en]));
let currentLanguage = localStorage.getItem('jasmine-hsk-language') === 'en' ? 'en' : 'vi';
function translateTextNodes(root, dictionary) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    if (node.parentElement?.closest('script,style,textarea,input')) continue;
    const original = node.nodeValue;
    const trimmed = original.trim();
    if (currentLanguage === 'vi') {
      const m = trimmed.match(/^Question (\d+) of (\d+)$/);
      if (m) {node.nodeValue = original.replace(trimmed, `Câu ${m[1]} / ${m[2]}`); continue;}
    } else {
      const m = trimmed.match(/^Câu (\d+) \/ (\d+)$/);
      if (m) {node.nodeValue = original.replace(trimmed, `Question ${m[1]} of ${m[2]}`); continue;}
    }
    if (dictionary[trimmed]) node.nodeValue = original.replace(trimmed, dictionary[trimmed]);
  }
}
function applyLanguage() {
  // Always normalize static text before translating, so toggles are reversible.
  translateTextNodes(document.body, UI_EN);
  if (currentLanguage === 'vi') translateTextNodes(document.body, UI_VI);
  document.documentElement.lang = currentLanguage;
  document.querySelectorAll('[data-lang]').forEach(btn => {
    const active = btn.dataset.lang === currentLanguage;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', String(active));
  });
  document.querySelectorAll('#panel input[type=text]').forEach(el => {
    el.placeholder = currentLanguage === 'vi' ? 'Nhập câu trả lời bằng tiếng Trung…' : 'Type your answer in Chinese…';
  });
}
document.querySelectorAll('[data-lang]').forEach(btn => btn.addEventListener('click', () => {
  currentLanguage = btn.dataset.lang;
  localStorage.setItem('jasmine-hsk-language', currentLanguage);
  applyLanguage();
}));
applyLanguage();

const observer = new MutationObserver(() => applyLanguage());
observer.observe(document.querySelector('#panel'), {childList:true,subtree:true});
