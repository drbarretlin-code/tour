import React, { useState } from 'react';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Info, 
  Hotel, 
  Car, 
  Coffee, 
  ShoppingBag, 
  Camera, 
  Phone, 
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  Edit3,
  Check,
  Navigation,
  Copy,
  ArrowRightLeft,
  AlertTriangle,
  Moon,
  Image as ImageIcon,
  RefreshCw,
  Loader2,
  Sparkles
} from 'lucide-react';

// ==========================================
// 初始行程資料庫 (已更新：Kliff、Cross Pattaya、美功鐵道市場等)
// ==========================================
const initialTripData = {
  title: "B&B泰國家庭旅遊",
  dates: "2026/07/14 - 2026/07/20",
  pax: "4人 (家庭旅遊)",
  requirements: [
    "7/15 需在 One Bangkok (SDConference) 附近",
    "住宿房型：兩間單人床 (Twin Room) x 2間",
    "必去：羅勇素芭他水果園、Pa Dee 咖啡、Kliff 餐廳、Cross Pattaya",
    "飯店等級：3星級以上"
  ],
  days: [
    {
      day: 1,
      date: "7/14 (日)",
      title: "抵達曼谷、初探都會魅力",
      summary: "班機抵達曼谷，專車接送或搭乘快線至市區飯店。下午探索全新地標 One Bangkok。",
      region: "曼谷",
      hotelName: "Centre Point Hotel Terminal 21",
      hotelMapQuery: "Centre+Point+Hotel+Terminal+21",
      activities: [
        { id: "d1-1", time: "10:00", title: "抵達曼谷機場 (BKK / DMK)", type: "transport", region: "曼谷", desc: "辦理入境手續、領取行李。如未包車，可搭乘機場快線(ARL)至 Makkasan站 (A6)，轉乘 MRT 藍線至 Phetchaburi 站 (BL21) / Sukhumvit 站 (BL22)。", links: [{ text: "預訂機場接送", url: "https://www.klook.com/zh-TW/", icon: Car }] },
        { id: "d1-2", time: "12:00", title: "辦理入住：Centre Point Hotel Terminal 21", type: "hotel", region: "曼谷", desc: "🚇 交通：位於 BTS 淺綠線 Asok 站 (E4) 與 MRT 藍線 Sukhumvit 站 (BL22) 交會處，出站步行1分鐘即達。", links: [{ text: "機場至飯店路線", url: "https://www.google.com/maps/dir/Suvarnabhumi+Airport/Centre+Point+Hotel+Terminal+21/", icon: Navigation }] },
        { id: "d1-3", time: "14:00", title: "午餐 & 逛街：One Bangkok (曼谷一號)", type: "shopping", region: "曼谷", desc: "🚇 交通：搭乘 MRT 藍線由 Sukhumvit 站 (BL22) 至 Lumphini 站 (BL25)，3號出口直達。曼谷全新奢華造鎮中心，先來熟悉環境並享用午餐。", links: [{ text: "飯店至商場路線", url: "https://www.google.com/maps/dir/Centre+Point+Hotel+Terminal+21/One+Bangkok/", icon: Navigation }] },
        { id: "d1-4", time: "18:00", title: "晚餐：Terminal 21 美食街 (Pier 21)", type: "food", region: "曼谷", desc: "🚇 交通：搭乘 MRT 藍線由 Lumphini 站 (BL25) 回 Sukhumvit 站 (BL22)。曼谷CP值最高的美食街，各種泰式小吃應有盡有。", links: [{ text: "食記參考", url: "https://www.viviyu.com/archives/26978", icon: ExternalLink }] }
      ]
    },
    {
      day: 2,
      date: "7/15 (一)",
      title: "研討會日 & 昭披耶河畔風光",
      summary: "一位家庭成員參加研討會，其他成員可前往 Iconsiam 與水門市場。晚上全家會合共進晚餐。",
      region: "曼谷",
      hotelName: "Centre Point Hotel Terminal 21",
      hotelMapQuery: "Centre+Point+Hotel+Terminal+21",
      activities: [
        { id: "d2-1", time: "09:00", title: "SDConference 研討會 (One Bangkok)", type: "info", region: "曼谷", desc: "🚇 交通：搭乘 MRT 藍線由 Sukhumvit 站 (BL22) 至 Lumphini 站 (BL25)。參加研討會。", links: [{ text: "飯店至研討會", url: "https://www.google.com/maps/dir/Centre+Point+Hotel+Terminal+21/One+Bangkok/", icon: Navigation }] },
        { id: "d2-2", time: "10:00", title: "家屬行程：水門市場 & Platinum Fashion Mall", type: "shopping", region: "曼谷", desc: "🚇 交通：搭乘 BTS 淺綠線 (Sukhumvit Line) 至 Chit Lom 站 (E1)，由 6 號出口經 R-Walk 空橋步行約 10 分鐘。泰國最大的服飾批發市場，室內有冷氣。", links: [{ text: "飯店至水門市場", url: "https://www.google.com/maps/dir/Centre+Point+Hotel+Terminal+21/The+Platinum+Fashion+Mall/", icon: Navigation }] },
        { id: "d2-3", time: "15:00", title: "家屬行程：ICONSIAM 暹羅天地", type: "shopping", region: "曼谷", desc: "🚇 交通：搭乘 BTS 淺綠線至 Siam 站 (CEN) 轉深綠線 (Silom Line) 至 Saphan Taksin 站 (S6)，由 2 號出口轉乘免費接駁船；或搭 BTS 金線至 Charoen Nakhon 站 (G2) 直達。", links: [{ text: "水門至ICONSIAM", url: "https://www.google.com/maps/dir/The+Platinum+Fashion+Mall/ICONSIAM/", icon: Navigation }] },
        { id: "d2-4", time: "18:30", title: "晚餐：昭披耶河遊船晚餐 / 高空酒吧", type: "food", region: "曼谷", desc: "全家會合. 搭乘豪華遊船一邊享用 Buffet 一邊欣賞鄭王廟、大皇宮夜景。", links: [{ text: "遊船預訂參考", url: "https://kimiyo.tw/the-chao-phraya-river/", icon: Info }] }
      ]
    },
    {
      day: 3,
      date: "7/16 (二)",
      title: "前往羅勇：鮮果饗宴與絕美花園",
      summary: "包車前往羅勇，完成您指定的願望清單！入住海景度假村。",
      region: "羅勇",
      hotelName: "Cross Pattaya Oceanphere",
      hotelMapQuery: "Cross+Pattaya+Oceanphere",
      activities: [
        { id: "d3-1", time: "09:00", title: "包車出發前往羅勇 (Rayong)", type: "transport", region: "曼谷-羅勇", desc: "🚗 交通：車程約 2.5 小時，今日皆為專車點對點接送，確保舒適度。", links: [{ text: "曼谷至羅勇路線", url: "https://www.google.com/maps/dir/Centre+Point+Hotel+Terminal+21/Suphattra+Land/", icon: Navigation }] },
        { id: "d3-2", time: "11:30", title: "指定景點：素芭他水果園 (Suphattra Land)", type: "camera", region: "羅勇", desc: "搭乘遊園車，享受當季水果吃到飽（榴槤、山竹），非常適合家庭同樂！", links: [{ text: "水果園位置", url: "https://www.google.com/maps/place/Suphattra+Land/", icon: MapPin }] },
        { id: "d3-3", time: "15:00", title: "指定景點：ร้านปาฎี Pa Dee 網美咖啡館", type: "coffee", region: "羅勇", desc: "絕美歐式花園咖啡館，坐在花園裡享受下午茶與甜點。", links: [{ text: "水果園至咖啡館", url: "https://www.google.com/maps/dir/Suphattra+Land/Pa+Dee+Rayong/", icon: Navigation }] },
        { id: "d3-4", time: "17:00", title: "辦理入住：Cross Pattaya Oceanphere 飯店", type: "hotel", region: "芭達雅", desc: "入住指定的質感度假村，享受極致的放鬆與泳池時光。", links: [{ text: "前往度假村", url: "https://www.google.com/maps/dir/Pa+Dee+Rayong/Cross+Pattaya+Oceanphere/", icon: Navigation }] }
      ]
    },
    {
      day: 4,
      date: "7/17 (三)",
      title: "芭達雅歡樂時光",
      summary: "享受飯店設施，前往主題樂園，傍晚在指定的 Kliff 懸崖餐廳看海吃晚餐。",
      region: "芭達雅",
      hotelName: "Cross Pattaya Oceanphere",
      hotelMapQuery: "Cross+Pattaya+Oceanphere",
      activities: [
        { id: "d4-1", time: "09:00", title: "飯店悠閒早餐 & 泳池時光", type: "hotel", region: "芭達雅", desc: "享受 Cross Pattaya 度假村設施。", links: [] },
        { id: "d4-2", time: "11:00", title: "哥倫比亞電影主題樂園 Aquaverse", type: "camera", region: "芭達雅", desc: "🚗 交通：建議包車或使用 Grab 前往。全球首座哥倫比亞影業主題水上樂園，全家玩水消暑。", links: [{ text: "飯店至樂園路線", url: "https://www.google.com/maps/dir/Cross+Pattaya+Oceanphere/Columbia+Pictures+Aquaverse/", icon: Navigation }] },
        { id: "d4-3", time: "17:30", title: "晚餐：Kliff Beach Club 懸崖餐廳", type: "food", region: "芭達雅", desc: "指定朝聖景點！芭達雅人氣懸崖海景餐廳，遠眺海景與夕陽，享用精緻料理。", links: [{ text: "前往懸崖餐廳", url: "https://www.google.com/maps/dir/Columbia+Pictures+Aquaverse/Kliff+Beach+Club+Pattaya/", icon: Navigation }] }
      ]
    },
    {
      day: 5,
      date: "7/18 (四)",
      title: "動物世界探索、返回曼谷",
      summary: "離開海邊，前往賽福瑞野生動物園，傍晚回到曼谷市區。",
      region: "曼谷",
      hotelName: "Centre Point Hotel Terminal 21",
      hotelMapQuery: "Centre+Point+Hotel+Terminal+21",
      activities: [
        { id: "d5-1", time: "09:30", title: "包車前往 Safari World 賽福瑞動物園", type: "transport", region: "曼谷近郊", desc: "🚗 交通：包車北上返回曼谷近郊。", links: [{ text: "芭達雅至動物園", url: "https://www.google.com/maps/dir/Cross+Pattaya+Oceanphere/Safari+World+Bangkok/", icon: Navigation }] },
        { id: "d5-2", time: "11:00", title: "Safari World 野生動物園", type: "camera", region: "曼谷近郊", desc: "搭乘遊園車近距離觀賞野生動物，並觀賞各項精彩表演。", links: [{ text: "動物園門票", url: "https://www.klook.com/", icon: Info }] },
        { id: "d5-3", time: "16:30", title: "返回曼谷市區辦理入住", type: "hotel", region: "曼谷", desc: "🚗 交通：專車接送回到曼谷市區飯店。", links: [{ text: "動物園至飯店", url: "https://www.google.com/maps/dir/Safari+World+Bangkok/Centre+Point+Hotel+Terminal+21/", icon: Navigation }] },
        { id: "d5-4", time: "18:30", title: "晚餐：Savoey 上味泰餐館", type: "food", region: "曼谷", desc: "🚇 交通：從飯店步行可達，或搭乘 BTS 淺綠線至 Asok (E4)。經典泰式海鮮餐廳，必點咖哩螃蟹。", links: [{ text: "飯店至餐廳", url: "https://www.google.com/maps/dir/Centre+Point+Hotel+Terminal+21/Savoey+Terminal21/", icon: Navigation }] }
      ]
    },
    {
      day: 6,
      date: "7/19 (五)",
      title: "雙市場體驗 & 伴手禮大採購",
      summary: "體驗美功鐵道市場與傳統水上風情，下午安排超市採買泰國必買零食與藥妝。",
      region: "曼谷",
      hotelName: "Centre Point Hotel Terminal 21",
      hotelMapQuery: "Centre+Point+Hotel+Terminal+21",
      activities: [
        { id: "d6-1", time: "08:00", title: "美功鐵道市場 & 丹能莎朵水上市場", type: "camera", region: "曼谷近郊", desc: "🚗 交通：建議包車或使用 Klook 一日遊。近距離觀賞火車穿梭於菜市場的奇景，並體驗手搖船水上交易。", links: [{ text: "前往鐵道市場", url: "https://www.google.com/maps/dir/Centre+Point+Hotel+Terminal+21/Maeklong+Railway+Market/", icon: Navigation }] },
        { id: "d6-2", time: "15:00", title: "Big C / 7-11 伴手禮採購", type: "shopping", region: "曼谷", desc: "🚇 交通：搭乘 BTS 淺綠線 (Sukhumvit Line) 至 Chit Lom 站 (E1)，由 9 號出口經天橋步行約 5 分鐘。曼谷必買伴手禮大採購。", links: [{ text: "水上市場至Big C", url: "https://www.google.com/maps/dir/Damnoen+Saduak+Floating+Market/Big+C+Supercenter+Ratchadamri/", icon: Navigation }] },
        { id: "d6-3", time: "18:30", title: "晚餐 & 泰式古法按摩 SPA", type: "info", region: "曼谷", desc: "🚇 交通：搭乘 BTS 淺綠線回 Asok 站 (E4)。慰勞這幾天的疲憊，安排 Let's Relax 進行按摩。", links: [{ text: "前往按摩店", url: "https://www.google.com/maps/dir/Big+C+Supercenter+Ratchadamri/Lets+Relax+Spa+Terminal+21/", icon: Navigation }] }
      ]
    },
    {
      day: 7,
      date: "7/20 (六)",
      title: "網美咖啡館、帶著回憶返家",
      summary: "把握最後時光，造訪曼谷人氣咖啡廳，準備搭機返台。",
      region: "曼谷",
      hotelName: "機場",
      hotelMapQuery: "Suvarnabhumi+Airport",
      activities: [
        { id: "d7-1", time: "10:00", title: "退房與行李寄放", type: "hotel", region: "曼谷", desc: "整理行囊，將行李寄放在飯店大廳。", links: [] },
        { id: "d7-2", time: "11:00", title: "FO SHO BRO 摩洛哥風咖啡館", type: "coffee", region: "曼谷", desc: "🚇 交通：搭乘 BTS 淺綠線 (Sukhumvit Line) 至 Udom Suk 站 (E12)，出站轉乘計程車/Grab 約 5-8 分鐘。人氣咖啡廳拍美照。", links: [{ text: "前往咖啡廳", url: "https://www.google.com/maps/dir/Centre+Point+Hotel+Terminal+21/FO+SHO+BRO+Bangkok/", icon: Navigation }] },
        { id: "d7-3", time: "16:00", title: "搭車前往機場", type: "transport", region: "曼谷", desc: "🚗 交通：返回飯店領取行李，搭乘預約專車或 Grab 前往機場，最晚於起飛前 3 小時抵達。", links: [{ text: "前往機場路線", url: "https://www.google.com/maps/dir/FO+SHO+BRO+Bangkok/Suvarnabhumi+Airport/", icon: Navigation }] },
        { id: "d7-4", time: "23:59 前", title: "抵達台灣，旅途圓滿結束", type: "info", region: "台灣", desc: "帶著滿滿的回憶平安抵達溫暖的家。", links: [] }
      ]
    }
  ],
  emergencyInfo: [
    { name: "泰國旅遊警察", number: "1155", desc: "24小時英語服務，旅遊糾紛首選" },
    { name: "泰國急救", number: "1669", desc: "緊急醫療救援" },
    { name: "泰國報警", number: "191", desc: "一般警察局" },
    { name: "台灣駐泰國代表處", number: "+66-81-8340919", desc: "護照遺失或重大意外" }
  ]
};

// ==========================================
// 元件：圖示對應
// ==========================================
const getIcon = (type) => {
  switch (type) {
    case 'hotel': return <Hotel className="w-5 h-5 text-indigo-500" />;
    case 'transport': return <Car className="w-5 h-5 text-amber-500" />;
    case 'shopping': return <ShoppingBag className="w-5 h-5 text-pink-500" />;
    case 'coffee': return <Coffee className="w-5 h-5 text-orange-500" />;
    case 'food': return <Info className="w-5 h-5 text-red-500" />;
    case 'camera': return <Camera className="w-5 h-5 text-emerald-500" />;
    default: return <Clock className="w-5 h-5 text-gray-500" />;
  }
};

// ==========================================
// 主程式 Main App Component
// ==========================================
export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [customNotes, setCustomNotes] = useState({});
  const [isCopied, setIsCopied] = useState(false); 
  
  // 狀態管理：行程資料
  const [tripSchedule, setTripSchedule] = useState(initialTripData);

  // 移動行程的 Modal 狀態
  const [isMoveModalOpen, setIsMoveModalOpen] = useState(false);
  const [movingActivity, setMovingActivity] = useState(null);
  const [targetDayId, setTargetDayId] = useState(1);
  const [aiWarning, setAiWarning] = useState(null);

  // 圖像生成狀態
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [infographicUrl, setInfographicUrl] = useState('image_1cf223.png'); // 預設使用上傳的圖片
  const [generateError, setGenerateError] = useState(null);

  // 處理備註更新
  const handleNoteChange = (activityId, text) => {
    setCustomNotes(prev => ({ ...prev, [activityId]: text }));
  };

  // 處理 KEY 一鍵複製
  const handleCopyKey = () => {
    const textToCopy = "AIzaSyD3o7irPMiP5BxV9dqzKzmg8Kwdd2opWhs";
    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); 
    } catch (err) {
      console.error('複製失敗', err);
    }
    document.body.removeChild(textArea);
  };

  // ==========================================
  // 核心功能：呼叫 Imagen 模型生成 3D 圖表
  // ==========================================
  const handleUpdateInfographic = async () => {
    setIsGeneratingImage(true);
    setGenerateError(null);

    // 1. 動態抓取最新的行程，將重點地點組合成 Prompt 指令
    const currentHighlights = tripSchedule.days.flatMap(d => d.activities.map(a => a.title)).slice(0, 10).join(", ");
    
    // 2. 構建給 AI 繪圖模型的精準 Prompt (因為影像模型對英文的理解最好，我們在此組成英文 Prompt)
    const promptText = `A vibrant 3D isometric overview map of a Thailand travel itinerary, covering Bangkok, Pattaya, and Rayong. The map clearly features miniature 3D models representing landmarks like Kliff restaurant, Cross Pattaya hotel, Suphattra Land, Pa Dee cafe, Maeklong Railway Market, Damnoen Saduak Floating Market, ICONSIAM, and Terminal 21. Colorful dashed route lines connect the locations indicating a 7-day journey. Bright, cheerful travel infographic style, highly detailed digital art, tilt-shift perspective. Bilingual aesthetic (simulated).`;

    const apiKey = "AIzaSyD3o7irPMiP5BxV9dqzKzmg8Kwdd2opWhs"; // 自動帶入金鑰
    const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`;
    const payload = { instances: { prompt: promptText }, parameters: { sampleCount: 1 } };
    const delays = [1000, 2000, 4000, 8000, 16000];

    // 3. 呼叫 API 並包含重試機制
    let success = false;
    for (let attempt = 0; attempt < 5; attempt++) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        
        if (!response.ok) throw new Error(`API Error: ${response.status}`);
        
        const result = await response.json();
        if (result.predictions && result.predictions[0]) {
          const newImageUrl = `data:image/png;base64,${result.predictions[0].bytesBase64Encoded}`;
          setInfographicUrl(newImageUrl);
          success = true;
          break; // 成功則跳出迴圈
        } else {
          throw new Error('No predictions returned');
        }
      } catch (error) {
        if (attempt === 4) {
          setGenerateError("圖表生成失敗，請稍後再試。");
        } else {
          await new Promise(resolve => setTimeout(resolve, delays[attempt]));
        }
      }
    }
    setIsGeneratingImage(false);
  };

  // 圖片載入失敗時的 Fallback
  const handleImageError = (e) => {
    e.target.src = 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000'; // 備用精美地圖意境圖
  };

  // 開啟移動行程的對話框
  const openMoveModal = (activity, sourceDayId) => {
    setMovingActivity({ activity, sourceDayId });
    setTargetDayId(sourceDayId); 
    setAiWarning(null); 
    setIsMoveModalOpen(true);
  };

  // 執行移動行程邏輯 (包含 AI 防呆判斷)
  const executeMoveActivity = () => {
    if (!movingActivity) return;

    const sourceDay = tripSchedule.days.find(d => d.day === movingActivity.sourceDayId);
    const targetDay = tripSchedule.days.find(d => d.day === targetDayId);
    
    // AI 防呆判斷
    if (movingActivity.activity.region !== targetDay.region && !aiWarning && movingActivity.sourceDayId !== targetDayId) {
      setAiWarning(
        `您正準備將位於【${movingActivity.activity.region}】的「${movingActivity.activity.title}」移至 Day ${targetDay.day}。
        但 Day ${targetDay.day} 的主要行程都在【${targetDay.region}】！兩地距離遙遠，可能會產生嚴重的交通與時間衝突。`
      );
      return; 
    }

    setTripSchedule(prevSchedule => {
      const newDays = prevSchedule.days.map(day => {
        if (day.day === movingActivity.sourceDayId) {
          return { ...day, activities: day.activities.filter(a => a.id !== movingActivity.activity.id) };
        }
        if (day.day === targetDayId) {
          return { ...day, activities: [...day.activities, movingActivity.activity] };
        }
        return day;
      });
      return { ...prevSchedule, days: newDays };
    });

    setIsMoveModalOpen(false);
    setMovingActivity(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 relative">
      
      {/* 頂部導航列 */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <MapPin className="text-teal-600 w-6 h-6" />
              <span className="font-bold text-xl text-teal-800">B&B泰國家庭旅遊</span>
            </div>
            
            {/* 桌面版選單 */}
            <nav className="hidden md:flex space-x-1">
              <button onClick={() => setActiveTab('overview')} className={`px-4 py-2 rounded-md font-medium transition ${activeTab === 'overview' ? 'bg-teal-50 text-teal-700' : 'text-slate-600 hover:bg-slate-100'}`}>總覽 & 準備</button>
              {tripSchedule.days.map((day) => (
                <button 
                  key={day.day}
                  onClick={() => setActiveTab(`day-${day.day}`)} 
                  className={`px-3 py-2 rounded-md font-medium transition ${activeTab === `day-${day.day}` ? 'bg-teal-50 text-teal-700' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                  Day {day.day}
                </button>
              ))}
            </nav>

            {/* 手機版選單漢堡鈕 */}
            <button className="md:hidden p-2 text-slate-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* 手機版展開選單 */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t px-4 pt-2 pb-4 space-y-1 shadow-lg absolute w-full z-50">
            <button 
              onClick={() => {setActiveTab('overview'); setMobileMenuOpen(false)}} 
              className={`block w-full text-left px-4 py-3 rounded-md ${activeTab === 'overview' ? 'bg-teal-50 text-teal-700' : 'text-slate-600'}`}
            >
              總覽 & 準備資訊
            </button>
            {tripSchedule.days.map((day) => (
              <button 
                key={day.day}
                onClick={() => {setActiveTab(`day-${day.day}`); setMobileMenuOpen(false)}} 
                className={`block w-full text-left px-4 py-3 rounded-md ${activeTab === `day-${day.day}` ? 'bg-teal-50 text-teal-700' : 'text-slate-600'}`}
              >
                Day {day.day} : {day.date}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Hero 圖片區塊 */}
      {activeTab === 'overview' && (
        <div className="relative bg-teal-800 h-64 sm:h-80 w-full overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&q=80&w=2000" 
            alt="Thailand" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 text-center">
            <span className="bg-teal-600/80 px-3 py-1 rounded-full text-sm font-semibold tracking-wider mb-4 shadow-sm">
              Sawasdee Krap / Ka
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-2 drop-shadow-md">
              {tripSchedule.title}
            </h1>
            <p className="text-lg sm:text-xl font-medium drop-shadow-sm flex items-center gap-2">
              <Calendar className="w-5 h-5" /> {tripSchedule.dates} | {tripSchedule.pax}
            </p>
          </div>
        </div>
      )}

      {/* 主要內容區 */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        
        {/* ==========================================
            總覽 & 準備資訊
            ========================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animation-fade-in">
            
            {/* 智能資訊圖表 (整合 Imagen 繪圖模型) */}
            <section className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <h2 className="text-xl font-bold text-teal-700 flex items-center gap-2">
                  <ImageIcon className="w-6 h-6" /> 智能行程資訊圖表
                </h2>
                <button 
                  onClick={handleUpdateInfographic}
                  disabled={isGeneratingImage}
                  className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isGeneratingImage ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                  {isGeneratingImage ? '正在繪製 3D 地圖...' : 'AI 重新生成圖表'}
                </button>
              </div>
              
              <div className="relative rounded-lg overflow-hidden border-2 border-slate-200 bg-slate-100 flex items-center justify-center min-h-[300px] w-full">
                {isGeneratingImage ? (
                  <div className="flex flex-col items-center justify-center text-indigo-600 py-12 px-4 text-center">
                    <Sparkles className="w-10 h-10 animate-pulse mb-3" />
                    <p className="font-bold text-lg">正在呼叫視覺模型繪製中...</p>
                    <p className="text-sm text-slate-500 mt-2 max-w-sm">
                      AI 正在為您生成最新的 3D 立體概觀地圖，並標記 Kliff 懸崖餐廳、Cross Pattaya 等關鍵景點。大約需要幾秒鐘，請稍候。
                    </p>
                  </div>
                ) : (
                  <img 
                    src={infographicUrl} 
                    alt="行程資訊圖表" 
                    onError={handleImageError}
                    className="w-full max-h-[500px] object-contain bg-white" 
                  />
                )}
              </div>
              {generateError && <p className="text-sm text-red-500 mt-2">{generateError}</p>}
              <p className="text-xs text-slate-400 mt-3 text-right">※ 提示：當您在其他分頁調整了景點順序後，可點擊上方按鈕根據最新行程即時生成路線圖表。</p>
            </section>

            {/* 需求確認區 */}
            <section className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Check className="text-teal-600" /> 行程客製化重點確認
              </h2>
              <ul className="space-y-3">
                {tripSchedule.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3 bg-slate-50 p-3 rounded-lg text-slate-700">
                    <span className="bg-teal-100 text-teal-800 w-6 h-6 rounded-full flex items-center justify-center text-sm flex-shrink-0 mt-0.5">{idx+1}</span>
                    <p className="leading-relaxed">{req}</p>
                  </li>
                ))}
              </ul>
            </section>

            {/* 緊急與實用資訊 */}
            <section className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                <h2 className="text-xl font-bold text-red-700 mb-4 flex items-center gap-2">
                  <Phone className="w-5 h-5" /> 緊急聯絡資訊
                </h2>
                <div className="space-y-4">
                  {tripSchedule.emergencyInfo.map((info, idx) => (
                    <div key={idx} className="flex justify-between items-center border-b border-slate-100 pb-2 last:border-0 last:pb-0">
                      <div>
                        <div className="font-semibold text-slate-800">{info.name}</div>
                        <div className="text-xs text-slate-500">{info.desc}</div>
                      </div>
                      <a href={`tel:${info.number}`} className="bg-red-50 text-red-700 font-bold px-3 py-1 rounded-full text-sm hover:bg-red-100 transition">
                        {info.number}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                <h2 className="text-xl font-bold text-teal-700 mb-4 flex items-center gap-2">
                  <Coffee className="w-5 h-5" /> 實用泰語通
                </h2>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex justify-between p-2 hover:bg-slate-50 rounded">
                    <span>你好 (男/女)</span><span className="font-medium text-teal-600">Sawasdee</span>
                  </li>
                  <li className="flex justify-between p-2 hover:bg-slate-50 rounded">
                    <span>謝謝 (男/女)</span><span className="font-medium text-teal-600">Khop Khun</span>
                  </li>
                  <li className="flex justify-between p-2 hover:bg-slate-50 rounded bg-amber-50">
                    <span className="font-bold">結帳 (最常用！)</span><span className="font-bold text-amber-600">Chek Bin</span>
                  </li>
                </ul>

                <div className="mt-5 pt-5 border-t border-slate-100 space-y-3">
                  <div className="flex justify-between items-center p-2 hover:bg-slate-50 rounded">
                    <span className="text-slate-700 font-medium">1. 雙向語譯網頁</span>
                    <a href="https://acia-2.vercel.app/" target="_blank" rel="noopener noreferrer" className="bg-teal-50 text-teal-700 hover:bg-teal-100 px-3 py-1.5 rounded-lg text-sm">
                      開啟工具
                    </a>
                  </div>
                  <div className="flex flex-col gap-2 p-2 hover:bg-slate-50 rounded">
                    <span className="text-slate-700 font-medium">2. KEY (授權碼)</span>
                    <div className="flex items-center gap-2">
                      <span className="bg-slate-100 px-2 py-1.5 rounded text-xs font-mono truncate w-full">AIzaSyD3o7irPMiP5BxV9dqzKzmg8Kwdd2opWhs</span>
                      <button onClick={handleCopyKey} className="bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-sm whitespace-nowrap">
                        {isCopied ? "已複製" : "複製"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ==========================================
            每日行程視圖
            ========================================== */}
        {tripSchedule.days.map((day) => {
          if (activeTab !== `day-${day.day}`) return null;
          
          return (
            <div key={day.day} className="animation-fade-in">
              <div className="mb-8 relative">
                <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Day {day.day} - {day.date}</h2>
                <h3 className="text-xl text-teal-600 font-medium mb-3">{day.title} <span className="text-sm bg-teal-100 text-teal-800 px-2 py-1 rounded ml-2">主要區域：{day.region}</span></h3>
                <p className="text-slate-600 bg-white p-4 rounded-lg shadow-sm border border-slate-100">{day.summary}</p>
              </div>

              {/* 時間軸 TimeLine */}
              <div className="relative border-l-2 border-teal-100 ml-3 md:ml-6 space-y-8 pb-4">
                {day.activities.map((act, index) => (
                  <div key={act.id} className="relative pl-6 md:pl-8">
                    {/* 圓點 */}
                    <div className="absolute w-8 h-8 bg-white border-2 border-teal-500 rounded-full -left-[17px] top-0 flex items-center justify-center shadow-sm z-10">
                      {getIcon(act.type)}
                    </div>
                    
                    {/* 卡片內容 */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition relative group">
                      
                      {/* 移動按鈕 */}
                      <button 
                        onClick={() => openMoveModal(act, day.day)}
                        className="absolute top-4 right-4 p-2 bg-slate-50 text-slate-500 hover:text-teal-600 hover:bg-teal-50 rounded-full transition opacity-50 group-hover:opacity-100 focus:opacity-100 z-10"
                        title="將此活動移至其他天"
                      >
                        <ArrowRightLeft className="w-5 h-5" />
                      </button>

                      <div className="p-5">
                        <div className="flex flex-wrap items-center gap-2 mb-2 pr-10">
                          <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded font-bold text-sm tracking-wide">
                            {act.time}
                          </span>
                          <span className="text-xs font-medium text-slate-400">區域：{act.region}</span>
                        </div>
                        <h4 className="text-lg font-bold text-slate-800 mb-2">{act.title}</h4>
                        <p className="text-slate-600 mb-4 leading-relaxed">{act.desc}</p>
                        
                        {/* 動作按鈕 / 連結區 */}
                        {act.links && act.links.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {act.links.map((link, idx) => {
                              const Icon = link.icon || ExternalLink;
                              return (
                                <a 
                                  key={idx} href={link.url} target="_blank" rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 text-teal-700 text-sm font-medium rounded-lg hover:bg-teal-100 transition"
                                >
                                  <Icon className="w-4 h-4" /> {link.text}
                                </a>
                              );
                            })}
                          </div>
                        )}

                        {/* 自訂備註功能 */}
                        <div className="mt-4 pt-4 border-t border-slate-100">
                          <label className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-2">
                            <Edit3 className="w-4 h-4" /> 彈性調整 / 筆記
                          </label>
                          <input 
                            type="text"
                            placeholder="例如：改去另一間餐廳、臨時更改集合時間..."
                            className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition"
                            value={customNotes[act.id] || ''}
                            onChange={(e) => handleNoteChange(act.id, e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* 自動生成的「返回飯店」卡片 (每日時間軸最後一站) */}
                {day.day !== 7 && (
                  <div className="relative pl-6 md:pl-8 mt-8">
                    {/* 月亮圓點 */}
                    <div className="absolute w-8 h-8 bg-indigo-50 border-2 border-indigo-400 rounded-full -left-[17px] top-0 flex items-center justify-center shadow-sm z-10">
                      <Moon className="w-4 h-4 text-indigo-500" />
                    </div>
                    
                    <div className="bg-indigo-50/50 rounded-xl border border-indigo-100 p-5 shadow-sm">
                      <h4 className="text-md font-bold text-indigo-800 flex items-center gap-2 mb-2">
                        🌙 結束今日行程：準備返回住宿地
                      </h4>
                      <div className="text-sm text-indigo-700 mb-3 space-y-1">
                        <p>建議交通方式：搭乘 Grab / Bolt，或搭乘大眾捷運返回飯店。</p>
                        
                        {/* 針對飯店提供保母級交通指示 */}
                        {day.region === '曼谷' && day.hotelName.includes('Centre Point') && (
                           <div className="bg-indigo-100/60 p-2.5 rounded text-indigo-800 mt-2 border border-indigo-200">
                             🚇 <b>保母級捷運指南：</b><br/>
                             請搭乘 <b>BTS 淺綠線 (Sukhumvit Line)</b> 至 <b>Asok 站 (代號 E4)</b>，或搭乘 <b>MRT 藍線 (Blue Line)</b> 至 <b>Sukhumvit 站 (代號 BL22)</b>。出站後步行 1 分鐘即可抵達飯店。
                           </div>
                        )}
                        {day.region === '芭達雅' && (
                           <div className="bg-indigo-100/60 p-2.5 rounded text-indigo-800 mt-2 border border-indigo-200">
                             🚗 <b>芭達雅交通指南：</b><br/>
                             該區域無捷運系統，請使用 Bolt 或 Grab 叫車，或搭乘嘟嘟車(雙條車)返回 {day.hotelName}。
                           </div>
                        )}
                        <p className="mt-2 text-indigo-900">今晚住宿：<strong>{day.hotelName}</strong></p>
                      </div>
                      <a 
                        href={`https://www.google.com/maps/dir/?api=1&destination=${day.hotelMapQuery}`} 
                        target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition shadow-sm"
                      >
                        <Navigation className="w-4 h-4" /> 點此導航回飯店
                      </a>
                    </div>
                  </div>
                )}
              </div>
              
              {/* 底部導航 */}
              <div className="flex justify-between items-center mt-6 border-t border-slate-200 pt-6">
                <button 
                  disabled={day.day === 1}
                  onClick={() => setActiveTab(`day-${day.day - 1}`)}
                  className="px-4 py-2 text-teal-600 font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-teal-50 rounded-lg transition"
                >
                  &larr; 前一天
                </button>
                <button 
                  disabled={day.day === tripSchedule.days.length}
                  onClick={() => setActiveTab(`day-${day.day + 1}`)}
                  className="px-4 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1"
                >
                  下一天 <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </main>
      
      {/* Footer */}
      <footer className="bg-slate-800 text-slate-400 py-6 text-center text-sm">
        <p>為您專屬生成的行程規劃網站 • 支援跨裝置瀏覽</p>
      </footer>

      {/* ==========================================
          移動行程用的對話框 Modal (AI 防呆設計)
          ========================================== */}
      {isMoveModalOpen && movingActivity && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animation-fade-in">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-lg flex items-center gap-2 text-slate-800">
                <ArrowRightLeft className="text-teal-600 w-5 h-5" /> 移動活動卡片
              </h3>
              <button onClick={() => setIsMoveModalOpen(false)} className="text-slate-400 hover:text-slate-600 bg-white rounded-full p-1 shadow-sm"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="p-6">
              <div className="mb-4 bg-white border border-slate-200 p-3 rounded-lg shadow-sm">
                <p className="text-xs text-slate-500 mb-1">您選擇移動的活動：</p>
                <p className="font-bold text-slate-800 truncate">{movingActivity.activity.title}</p>
                <p className="text-xs text-teal-600 font-medium mt-1">地理位置：{movingActivity.activity.region}</p>
              </div>

              <label className="block text-sm font-medium text-slate-700 mb-2">請選擇目標天數：</label>
              <select 
                className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-teal-500 outline-none transition mb-4 text-slate-800 font-medium"
                value={targetDayId}
                onChange={(e) => {
                  setTargetDayId(Number(e.target.value));
                  setAiWarning(null); // 切換天數時清除先前的警告
                }}
              >
                {tripSchedule.days.map(d => (
                  <option key={d.day} value={d.day}>
                    Day {d.day} - {d.date} ({d.region})
                  </option>
                ))}
              </select>

              {/* AI 警告區塊 */}
              {aiWarning && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded-r-lg animation-fade-in">
                  <div className="flex gap-3">
                    <AlertTriangle className="text-red-500 w-6 h-6 flex-shrink-0" />
                    <div>
                      <h4 className="text-red-800 font-bold mb-1">AI 行程防呆提醒</h4>
                      <p className="text-sm text-red-700 whitespace-pre-line leading-relaxed">{aiWarning}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 mt-6">
                <button 
                  onClick={() => setIsMoveModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition"
                >
                  取消
                </button>
                <button 
                  onClick={executeMoveActivity}
                  className={`px-4 py-2 font-medium rounded-lg transition shadow-sm flex items-center gap-2 ${aiWarning ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-teal-600 hover:bg-teal-700 text-white'}`}
                >
                  {aiWarning ? '我了解風險，強制變更' : '確認移動'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
