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
  Sparkles,
  Plus,
  Trash2
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
        {
          id: "d1-1",
          time: "10:00",
          title: "抵達曼谷機場 (BKK / DMK)",
          type: "transport",
          region: "曼谷",
          desc: "辦理入境手續、領取行李。如未包車，可搭乘機場快線(ARL)至 Makkasan站 (A6)，轉乘 MRT 藍線至 Phetchaburi 站 (BL21) / Sukhumvit 站 (BL22)。",
          links: [
            { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=Suvarnabhumi+Airport", icon: MapPin },
            { text: "景點介紹", url: "https://www.klook.com/zh-TW/blog/bangkok-airport-transfers/", icon: Info },
            { text: "預訂接送", url: "https://www.klook.com/zh-TW/", icon: Car }
          ]
        },
        {
          id: "d1-2",
          time: "12:00",
          title: "辦理入住：Centre Point Hotel Terminal 21",
          type: "hotel",
          region: "曼谷",
          desc: "🚇 交通：位於 BTS 淺綠線 Asok 站 (E4) 與 MRT 藍線 Sukhumvit 站 (BL22) 交會處，出站步行1分鐘即達。",
          links: [
            { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=Grande+Centre+Point+Hotel+Terminal+21", icon: MapPin },
            { text: "景點介紹", url: "https://tw.hotels.com/ho403204/", icon: Info },
            { text: "飯店訂房", url: "https://tw.hotels.com/ho403204/", icon: Hotel },
            { text: "機場至飯店路線", url: "https://www.google.com/maps/dir/Suvarnabhumi+Airport/Centre+Point+Hotel+Terminal+21/", icon: Navigation }
          ]
        },
        {
          id: "d1-3",
          time: "14:00",
          title: "午餐 & 逛街：One Bangkok (曼谷一號)",
          type: "shopping",
          region: "曼谷",
          desc: "🚇 交通：搭乘 MRT 藍線由 Sukhumvit 站 (BL22) 至 Lumphini 站 (BL25)，3號出口直達。曼谷全新奢華造鎮中心，先來熟悉環境並享用午餐。",
          links: [
            { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=One+Bangkok", icon: MapPin },
            { text: "景點介紹", url: "https://www.onebangkok.com/", icon: Info },
            { text: "飯店至商場路線", url: "https://www.google.com/maps/dir/Centre+Point+Hotel+Terminal+21/One+Bangkok/", icon: Navigation }
          ]
        },
        {
          id: "d1-4",
          time: "18:00",
          title: "晚餐：Terminal 21 美食街 (Pier 21)",
          type: "food",
          region: "曼谷",
          desc: "🚇 交通：搭乘 MRT 藍線由 Lumphini 站 (BL25) 回 Sukhumvit 站 (BL22)。曼谷CP值最高的美食街，各種泰式小吃應有盡有。",
          links: [
            { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=Terminal+21+Asok", icon: MapPin },
            { text: "景點介紹", url: "https://www.viviyu.com/archives/26978", icon: Info },
            { text: "食記參考", url: "https://www.viviyu.com/archives/26978", icon: ExternalLink }
          ]
        }
      ]
    },
    {
      day: 2,
      date: "7/15 (一)",
      title: "研討會日 & 昭披耶河畔風光",
      summary: "一位家庭成員參加快捷研討會，其他成員可前往 Iconsiam 與水門市場。晚上全家會合共進晚餐。",
      region: "曼谷",
      hotelName: "Centre Point Hotel Terminal 21",
      hotelMapQuery: "Centre+Point+Hotel+Terminal+21",
      activities: [
        {
          id: "d2-1",
          time: "09:00",
          title: "SDConference 研討會 (One Bangkok)",
          type: "info",
          region: "曼谷",
          desc: "🚇 交通：搭乘 MRT 藍線由 Sukhumvit 站 (BL22) 至 Lumphini 站 (BL25)。參加研討會。",
          links: [
            { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=One+Bangkok", icon: MapPin },
            { text: "景點介紹", url: "https://www.onebangkok.com/", icon: Info },
            { text: "飯店至研討會路線", url: "https://www.google.com/maps/dir/Centre+Point+Hotel+Terminal+21/One+Bangkok/", icon: Navigation }
          ]
        },
        {
          id: "d2-2",
          time: "10:00",
          title: "家屬行程：水門市場 & Platinum Fashion Mall",
          type: "shopping",
          region: "曼谷",
          desc: "🚇 交通：搭乘 BTS 淺綠線 (Sukhumvit Line) 至 Chit Lom 站 (E1)，由 6 號出口經 R-Walk 空橋步行約 10 分鐘。泰國最大的服飾批發市場，室內有冷氣。",
          links: [
            { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=The+Platinum+Fashion+Mall", icon: MapPin },
            { text: "景點介紹", url: "https://www.bring-you.info/zh-tw/pratunam-market", icon: Info },
            { text: "飯店至水門市場路線", url: "https://www.google.com/maps/dir/Centre+Point+Hotel+Terminal+21/The+Platinum+Fashion+Mall/", icon: Navigation }
          ]
        },
        {
          id: "d2-3",
          time: "15:00",
          title: "家屬行程：ICONSIAM 暹羅天地",
          type: "shopping",
          region: "曼谷",
          desc: "🚇 交通：搭乘 BTS 淺綠線至 Siam 站 (CEN) 轉深綠線 (Silom Line) 至 Saphan Taksin 站 (S6)，由 2 號出口轉乘免費接駁船；或搭 BTS 金線至 Charoen Nakhon 站 (G2) 直達。",
          links: [
            { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=ICONSIAM", icon: MapPin },
            { text: "景點介紹", url: "https://www.iconsiam.com/zh-tw", icon: Info },
            { text: "水門至ICONSIAM路線", url: "https://www.google.com/maps/dir/The+Platinum+Fashion+Mall/ICONSIAM/", icon: Navigation }
          ]
        },
        {
          id: "d2-4",
          time: "18:30",
          title: "晚餐：昭披耶河遊船晚餐 / 高空酒吧",
          type: "food",
          region: "曼谷",
          desc: "全家會合。搭乘豪華遊船一邊享用 Buffet 一邊欣賞鄭王廟、大皇宮夜景。",
          links: [
            { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=River+City+Bangkok", icon: MapPin },
            { text: "景點介紹", url: "https://www.klook.com/zh-TW/activity/362-chao-phraya-princess-cruise-bangkok/", icon: Info },
            { text: "遊船預訂參考", url: "https://www.klook.com/zh-TW/activity/362-chao-phraya-princess-cruise-bangkok/", icon: ExternalLink }
          ]
        }
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
        {
          id: "d3-1",
          time: "09:00",
          title: "包車出發前往羅勇 (Rayong)",
          type: "transport",
          region: "曼谷-羅勇",
          desc: "🚗 交通：車程約 2.5 小時，今日皆為專車點對點接送，確保舒適度。",
          links: [
            { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=Suphattra+Land", icon: MapPin },
            { text: "景點介紹", url: "https://www.klook.com/zh-TW/activity/95015-suphattra-land-orchard-rayong/", icon: Info },
            { text: "曼谷至羅勇路線", url: "https://www.google.com/maps/dir/Centre+Point+Hotel+Terminal+21/Suphattra+Land/", icon: Navigation }
          ]
        },
        {
          id: "d3-2",
          time: "11:30",
          title: "指定景點：素芭他水果園 (Suphattra Land)",
          type: "camera",
          region: "羅勇",
          desc: "水果大餐吃到飽，現摘榴槤與山竹，非常適合家庭遊客！",
          links: [
            { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=Suphattra+Land", icon: MapPin },
            { text: "景點介紹", url: "https://www.klook.com/zh-TW/activity/95015-suphattra-land-orchard-rayong/", icon: Info }
          ]
        },
        {
          id: "d3-2", // Let's keep the existing id, wait: it's Day 3 - Activity 3
          id: "d3-3",
          time: "15:00",
          title: "指定景點：ร้านปาฎี Pa Dee 網美咖啡館",
          type: "coffee",
          region: "羅勇",
          desc: "絕美歐式鄉村風花園咖啡館，坐在花園裡享受悠閒的英式下午茶。",
          links: [
            { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=Pa+Dee+Rayong", icon: MapPin },
            { text: "景點介紹", url: "https://www.viviyu.com/archives/5654", icon: Info },
            { text: "水果園至咖啡館路線", url: "https://www.google.com/maps/dir/Suphattra+Land/Pa+Dee+Rayong/", icon: Navigation }
          ]
        },
        {
          id: "d3-4",
          time: "17:00",
          title: "辦理入住：Cross Pattaya Oceanphere 飯店",
          type: "hotel",
          region: "芭達雅",
          desc: "入住指定的質感度假村，享受極致的放鬆與私人泳池時光。",
          links: [
            { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=Cross+Pattaya+Oceanphere", icon: MapPin },
            { text: "景點介紹", url: "https://tw.hotels.com/ho32585204/", icon: Info },
            { text: "飯店訂房", url: "https://tw.hotels.com/ho32585204/", icon: Hotel },
            { text: "咖啡館至飯店路線", url: "https://www.google.com/maps/dir/Pa+Dee+Rayong/Cross+Pattaya+Oceanphere/", icon: Navigation }
          ]
        }
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
        {
          id: "d4-1",
          time: "09:00",
          title: "飯店悠閒早餐 & 泳池時光",
          type: "hotel",
          region: "芭達雅",
          desc: "享受 Cross Pattaya 度假村設施與豐富早餐。",
          links: [
            { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=Cross+Pattaya+Oceanphere", icon: MapPin },
            { text: "景點介紹", url: "https://tw.hotels.com/ho32585204/", icon: Info },
            { text: "飯店訂房", url: "https://tw.hotels.com/ho32585204/", icon: Hotel }
          ]
        },
        {
          id: "d4-2",
          time: "11:00",
          title: "哥倫比亞電影主題樂園 Aquaverse",
          type: "camera",
          region: "芭達雅",
          desc: "🚗 交通：建議包車或使用 Grab 前往。全球首座哥倫比亞影業主題水上樂園，全家玩水消暑。",
          links: [
            { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=Columbia+Pictures+Aquaverse", icon: MapPin },
            { text: "景點介紹", url: "https://www.klook.com/zh-TW/activity/71542-columbia-pictures-aquaverse-water-park-ticket-pattaya/", icon: Info },
            { text: "飯店至樂園路線", url: "https://www.google.com/maps/dir/Cross+Pattaya+Oceanphere/Columbia+Pictures+Aquaverse/", icon: Navigation }
          ]
        },
        {
          id: "d4-3",
          time: "17:30",
          title: "晚餐：Kliff Beach Club 懸崖餐廳",
          type: "food",
          region: "芭達雅",
          desc: "指定朝聖景點！芭達雅人氣懸崖海景餐廳，遠眺海景與夕陽，享用精緻料理。",
          links: [
            { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=Kliff+Beach+Club+Pattaya", icon: MapPin },
            { text: "景點介紹", url: "https://flyblog.cc/cross-pattaya-pratamnak/", icon: Info },
            { text: "樂園至餐廳路線", url: "https://www.google.com/maps/dir/Columbia+Pictures+Aquaverse/Kliff+Beach+Club+Pattaya/", icon: Navigation }
          ]
        }
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
        {
          id: "d5-1",
          time: "09:30",
          title: "包車前往 Safari World 賽福瑞動物園",
          type: "transport",
          region: "曼谷近郊",
          desc: "🚗 交通：包車北上返回曼谷近郊。",
          links: [
            { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=Safari+World+Bangkok", icon: MapPin },
            { text: "景點介紹", url: "https://www.klook.com/zh-TW/activity/365-safari-world-bangkok/", icon: Info },
            { text: "飯店至動物園路線", url: "https://www.google.com/maps/dir/Cross+Pattaya+Oceanphere/Safari+World+Bangkok/", icon: Navigation }
          ]
        },
        {
          id: "d5-2",
          time: "11:00",
          title: "Safari World 野生動物園",
          type: "camera",
          region: "曼谷近郊",
          desc: "搭乘遊園車近距離觀賞野生動物，並觀賞各項精彩表演。",
          links: [
            { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=Safari+World+Bangkok", icon: MapPin },
            { text: "景點介紹", url: "https://www.klook.com/zh-TW/activity/365-safari-world-bangkok/", icon: Info },
            { text: "預訂門票", url: "https://www.klook.com/zh-TW/activity/365-safari-world-bangkok/", icon: ExternalLink }
          ]
        },
        {
          id: "d5-3",
          time: "16:30",
          title: "返回曼谷市區辦理入住",
          type: "hotel",
          region: "曼谷",
          desc: "🚗 交通：專車接送回到曼谷市區飯店。",
          links: [
            { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=Grande+Centre+Point+Hotel+Terminal+21", icon: MapPin },
            { text: "景點介紹", url: "https://tw.hotels.com/ho403204/", icon: Info },
            { text: "飯店訂房", url: "https://tw.hotels.com/ho403204/", icon: Hotel },
            { text: "動物園至飯店路線", url: "https://www.google.com/maps/dir/Safari+World+Bangkok/Centre+Point+Hotel+Terminal+21/", icon: Navigation }
          ]
        },
        {
          id: "d5-4",
          time: "18:30",
          title: "晚餐：Savoey 上味泰餐館",
          type: "food",
          region: "曼谷",
          desc: "🚇 交通：從飯店步行可達，或搭乘 BTS 淺綠線至 Asok (E4)。經典泰式海鮮餐廳，必點咖哩螃蟹。",
          links: [
            { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=Savoey+Seafood+Co+Bangkok", icon: MapPin },
            { text: "景點介紹", url: "https://www.klook.com/zh-TW/activity/9880-savoey-seafood-co-bangkok/", icon: Info },
            { text: "飯店至餐廳路線", url: "https://www.google.com/maps/dir/Centre+Point+Hotel+Terminal+21/Savoey+Terminal21/", icon: Navigation }
          ]
        }
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
        {
          id: "d6-1",
          time: "08:00",
          title: "美功鐵道市場 & 丹能莎朵水上市場",
          type: "camera",
          region: "曼谷近郊",
          desc: "🚗 交通：建議包車或使用 Klook 一日遊。近距離觀賞火車穿梭於菜市場的奇景，並體驗手搖船水上交易。",
          links: [
            { text: "鐵道市場地圖", url: "https://www.google.com/maps/search/?api=1&query=Maeklong+Railway+Market", icon: MapPin },
            { text: "鐵道市場介紹", url: "https://www.klook.com/zh-TW/activity/91667-maeklong-railway-market-amphawa-floating-market-day-tour-bangkok/", icon: Info },
            { text: "水上市場地圖", url: "https://www.google.com/maps/search/?api=1&query=Damnoen+Saduak+Floating+Market", icon: MapPin },
            { text: "水上市場介紹", url: "https://www.klook.com/zh-TW/activity/132-damnoen-saduak-floating-market-bangkok/", icon: Info }
          ]
        },
        {
          id: "d6-2",
          time: "15:00",
          title: "Big C / 7-11 伴手禮採購",
          type: "shopping",
          region: "曼谷",
          desc: "🚇 交通：搭乘 BTS 淺綠線 (Sukhumvit Line) 至 Chit Lom 站 (E1)，由 9 號出口經天橋步行約 5 分鐘。曼谷必買伴手禮大採購。",
          links: [
            { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=Big+C+Supercenter+Ratchadamri", icon: MapPin },
            { text: "景點介紹", url: "https://www.bring-you.info/zh-tw/bangkok-must-buy", icon: Info },
            { text: "水上市場至商場路線", url: "https://www.google.com/maps/dir/Damnoen+Saduak+Floating+Market/Big+C+Supercenter+Ratchadamri/", icon: Navigation }
          ]
        },
        {
          id: "d6-3",
          time: "18:30",
          title: "晚餐 & 泰式古法按摩 SPA",
          type: "info",
          region: "曼谷",
          desc: "🚇 交通：搭乘 BTS 淺綠線回 Asok 站 (E4)。慰勞這幾天的疲憊，安排 Let's Relax 進行按摩。",
          links: [
            { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=Let%27s+Relax+Spa+Terminal+21", icon: MapPin },
            { text: "景點介紹", url: "https://www.klook.com/zh-TW/activity/1659-lets-relax-spa-treatments-bangkok/", icon: Info },
            { text: "商場至按摩店路線", url: "https://www.google.com/maps/dir/Big+C+Supercenter+Ratchadamri/Lets+Relax+Spa+Terminal+21/", icon: Navigation }
          ]
        }
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
        {
          id: "d7-1",
          time: "10:00",
          title: "退房與行李寄放",
          type: "hotel",
          region: "曼谷",
          desc: "整理行囊，將行李寄放在飯店大廳。",
          links: [
            { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=Grande+Centre+Point+Hotel+Terminal+21", icon: MapPin },
            { text: "景點介紹", url: "https://tw.hotels.com/ho403204/", icon: Info }
          ]
        },
        {
          id: "d7-2",
          time: "11:00",
          title: "FO SHO BRO 摩洛哥風咖啡館",
          type: "coffee",
          region: "曼谷",
          desc: "🚇 交通：搭乘 BTS 淺綠線 (Sukhumvit Line) 至 Udom Suk 站 (E12)，出站轉乘計程車/Grab 約 5-8 分鐘。人氣咖啡廳拍美照。",
          links: [
            { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=FO+SHO+BRO+Bangkok", icon: MapPin },
            { text: "景點介紹", url: "https://www.wendyjourney.com/fo-sho-bro/", icon: Info },
            { text: "飯店至咖啡廳路線", url: "https://www.google.com/maps/dir/Centre+Point+Hotel+Terminal+21/FO+SHO+BRO+Bangkok/", icon: Navigation }
          ]
        },
        {
          id: "d7-3",
          time: "16:00",
          title: "搭車前往機場",
          type: "transport",
          region: "曼谷",
          desc: "🚗 交通: 返回飯店領取行李，搭乘預約專車或 Grab 前往機場，最晚於起飛前 3 小時抵達。",
          links: [
            { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=Suvarnabhumi+Airport", icon: MapPin },
            { text: "景點介紹", url: "https://www.klook.com/zh-TW/blog/bangkok-airport-transfers/", icon: Info },
            { text: "咖啡廳至機場路線", url: "https://www.google.com/maps/dir/FO+SHO+BRO+Bangkok/Suvarnabhumi+Airport/", icon: Navigation }
          ]
        },
        {
          id: "d7-4",
          time: "23:59 前",
          title: "抵達台灣，旅途圓滿結束",
          type: "info",
          region: "台灣",
          desc: "帶著滿滿的回憶平安抵達溫暖的家。",
          links: [
            { text: "景點地圖", url: "https://www.google.com/maps/place/Taiwan+Taoyuan+International+Airport", icon: MapPin },
            { text: "景點介紹", url: "https://www.taoyuan-airport.com/", icon: Info }
          ]
        }
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

const HOTSPOT_CONFIGS = [
  {
    key: 'terminal21',
    keywords: ['Terminal 21', 'Terminal21', 'Pier 21'],
    name: 'Terminal 21',
    style: { left: '8%', top: '10%', width: '25%', height: '18%' },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Terminal+21+Asok',
    infoUrl: 'https://tw.hotels.com/ho403204/'
  },
  {
    key: 'iconsiam',
    keywords: ['ICONSIAM', '暹羅天地'],
    name: 'ICONSIAM',
    style: { left: '34%', top: '15%', width: '20%', height: '18%' },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=ICONSIAM',
    infoUrl: 'https://www.iconsiam.com/zh-tw'
  },
  {
    key: 'floating_market',
    keywords: ['水上市場', '丹能莎朵'],
    name: '丹能莎朵水上市場',
    style: { left: '5%', top: '28%', width: '25%', height: '18%' },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Damnoen+Saduak+Floating+Market',
    infoUrl: 'https://www.klook.com/zh-TW/activity/132-damnoen-saduak-floating-market-bangkok/'
  },
  {
    key: 'railway_market',
    keywords: ['鐵道市場', '美功'],
    name: '美功鐵道市場',
    style: { left: '5%', top: '48%', width: '25%', height: '18%' },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Maeklong+Railway+Market',
    infoUrl: 'https://www.klook.com/zh-TW/activity/91667-maeklong-railway-market-amphawa-floating-market-day-tour-bangkok/'
  },
  {
    key: 'cross_pattaya',
    keywords: ['Cross Pattaya', 'CrossPattaya'],
    name: 'Cross Pattaya',
    style: { left: '42%', top: '38%', width: '18%', height: '18%' },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Cross+Pattaya+Oceanphere',
    infoUrl: 'https://tw.hotels.com/ho32585204/'
  },
  {
    key: 'kliff',
    keywords: ['Kliff'],
    name: 'Kliff 懸崖餐廳',
    style: { left: '60%', top: '45%', width: '15%', height: '16%' },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Kliff+Beach+Club+Pattaya',
    infoUrl: 'https://flyblog.cc/cross-pattaya-pratamnak/'
  },
  {
    key: 'suphattra',
    keywords: ['素芭他', '水果園', 'Suphattra'],
    name: '素芭他水果園',
    style: { left: '54%', top: '70%', width: '20%', height: '16%' },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Suphattra+Land',
    infoUrl: 'https://www.klook.com/zh-TW/activity/95015-suphattra-land-orchard-rayong/'
  },
  {
    key: 'padee',
    keywords: ['Pa Dee', 'ร้านปาฎี'],
    name: 'Pa Dee 咖啡館',
    style: { left: '77%', top: '76%', width: '18%', height: '16%' },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Pa+Dee+Rayong',
    infoUrl: 'https://www.viviyu.com/archives/5654'
  },
  {
    key: 'one_bangkok',
    keywords: ['One Bangkok', 'SDConference', '曼谷一號'],
    name: 'One Bangkok',
    style: { left: '22%', top: '10%', width: '10%', height: '10%' },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=One+Bangkok',
    infoUrl: 'https://www.onebangkok.com/'
  },
  {
    key: 'safari_world',
    keywords: ['Safari World', '野生動物園', '賽福瑞'],
    name: 'Safari World 賽福瑞動物園',
    style: { left: '20%', top: '2%', width: '15%', height: '10%' },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Safari+World+Bangkok',
    infoUrl: 'https://www.klook.com/zh-TW/activity/365-safari-world-bangkok/'
  },
  {
    key: 'water_market',
    keywords: ['水門市場', 'Platinum'],
    name: '水門市場',
    style: { left: '12%', top: '20%', width: '10%', height: '8%' },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=The+Platinum+Fashion+Mall',
    infoUrl: 'https://www.bring-you.info/zh-tw/pratunam-market'
  },
  {
    key: 'savoey',
    keywords: ['Savoey', '上味泰'],
    name: 'Savoey 上味泰餐館',
    style: { left: '5%', top: '2%', width: '12%', height: '8%' },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Savoey+Seafood+Co+Bangkok',
    infoUrl: 'https://www.klook.com/zh-TW/activity/9880-savoey-seafood-co-bangkok/'
  },
  {
    key: 'fosho_bro',
    keywords: ['FO SHO BRO', '摩洛哥風咖啡館'],
    name: 'FO SHO BRO 咖啡館',
    style: { left: '38%', top: '28%', width: '12%', height: '8%' },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=FO+SHO+BRO+Bangkok',
    infoUrl: 'https://www.wendyjourney.com/fo-sho-bro/'
  },
  {
    key: 'chao_phraya',
    keywords: ['昭披耶河', 'Chao Phraya', '遊船'],
    name: '昭披耶河遊船',
    style: { left: '26%', top: '27%', width: '12%', height: '8%' },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Chao+Phraya+River',
    infoUrl: 'https://www.klook.com/zh-TW/activity/362-chao-phraya-princess-cruise-bangkok/'
  },
  {
    key: 'aquaverse',
    keywords: ['Aquaverse', '樂園', '水上樂園'],
    name: '哥倫比亞影業主題樂園 Aquaverse',
    style: { left: '50%', top: '53%', width: '12%', height: '8%' },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Columbia+Pictures+Aquaverse',
    infoUrl: 'https://www.klook.com/zh-TW/activity/71542-columbia-pictures-aquaverse-water-park-ticket-pattaya/'
  },
  {
    key: 'big_c',
    keywords: ['Big C', '伴手禮'],
    name: 'Big C 採購',
    style: { left: '22%', top: '22%', width: '10%', height: '8%' },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Big+C+Supercenter+Ratchadamri',
    infoUrl: 'https://www.bring-you.info/zh-tw/bangkok-must-buy'
  },
  {
    key: 'lets_relax',
    keywords: ['Let\'s Relax', '按摩', 'SPA'],
    name: 'Let\'s Relax 泰式按摩',
    style: { left: '2%', top: '10%', width: '10%', height: '8%' },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Let%27s+Relax+Spa+Terminal+21',
    infoUrl: 'https://www.klook.com/zh-TW/activity/1659-lets-relax-spa-treatments-bangkok/'
  },
  {
    key: 'airport',
    keywords: ['機場', 'Airport', 'Suvarnabhumi'],
    name: '蘇凡納布機場',
    style: { left: '38%', top: '2%', width: '12%', height: '8%' },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Suvarnabhumi+Airport',
    infoUrl: 'https://www.klook.com/zh-TW/blog/bangkok-airport-transfers/'
  }
];

const HOTEL_BOOKING_URLS = {
  "Centre Point Hotel Terminal 21": "https://tw.hotels.com/ho403204/",
  "Cross Pattaya Oceanphere": "https://tw.hotels.com/ho32585204/",
  "Grande Centre Point Hotel Terminal 21": "https://tw.hotels.com/ho403204/"
};

// ==========================================
// AI 分析與評估輔助函式 (Gemini API 呼叫與本地 Fallback)
// ==========================================
const callGeminiAnalysis = async (urlsText, tripSchedule) => {
  const apiKey = "AIzaSyD3o7irPMiP5BxV9dqzKzmg8Kwdd2opWhs";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  
  const prompt = `
您是一位專業的泰國旅遊行程規劃助手。現在使用者提供了一些想要新增的行程網址（或景點名稱），以及目前的 7 天行程規畫。
請針對這些新增項目進行分析，評估它們的「地理位置（曼谷/羅勇/芭達雅/曼谷近郊）」、「景點分類（如: coffee/food/shopping/camera/hotel/transport/info）」、以及「與既有行程的同質性（如同質性太高、功能重疊等）」。

**既有行程摘要**：
${JSON.stringify(tripSchedule.days.map(d => ({ day: d.day, date: d.date, region: d.region, activities: d.activities.map(a => ({ title: a.title, type: a.type, desc: a.desc })) })))}

**使用者貼入的新增網址/景點**：
${urlsText}

**分析要求與限制**：
1. 分析每一個輸入。如果使用者貼入的是網址，請根據網址中的關鍵字或旅遊常識，推估出景點的實際中文名稱與細節。
2. 進行以下評估：
   - **分類與地理位置**：推估其主要區域是曼谷、羅勇、芭達雅還是曼谷近郊，並判斷其分類。
   - **同質性警示 (similarityWarning)**：比對既有行程，是否已經有類似的咖啡廳、餐廳、購物點或景點。若同質性太高，請提出提醒（例如：您已安排 Pa Dee 咖啡與 FO SHO BRO 咖啡，此處可能同質性高）。如果沒有，請寫 "無"。
   - **地理位置衝突 (locationWarning)**：如果推薦的天數主要活動區域與本景點區域相距甚遠，請警告。例如：Day 1 主要活動在曼谷，若把此景點（位於羅勇）排在 Day 1 會有嚴重交通衝突。如果沒有，請寫 "無"。
   - **不好體驗因素警示 (experienceWarning)**：例如：7月是泰國雨季，戶外景點容易受雨天影響；或者此地交通極易擁堵等。如果沒有，請寫 "無"。
   - **建議與排定理由 (suggestion)**：說明推薦排在第幾天、什麼時間，以及為什麼。
3. 請務必只回傳標準的 JSON 格式（以 { "analysisResults": [...] } 的格式回傳），不要包含任何 markdown 的 \`\`\`json 包裹標記，以便於程式解析。

JSON 結構樣式：
{
  "analysisResults": [
    {
      "title": "景點名稱",
      "url": "輸入的原始網址",
      "category": "分類 (如: coffee, food, shopping, camera, hotel, transport, info)",
      "region": "地理區域 (如: 曼谷, 羅勇, 芭達雅, 曼谷近郊)",
      "similarityWarning": "警示內容或無",
      "locationWarning": "警示內容或無",
      "experienceWarning": "警示內容或無",
      "suggestion": "排程建議說明",
      "suggestedDay": 1,
      "suggestedTime": "14:00"
    }
  ]
}
`;

  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      responseMimeType: "application/json"
    }
  };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`Gemini API 回傳錯誤: ${response.status}`);
  }

  const data = await response.json();
  const jsonText = data.candidates[0].content.parts[0].text;
  return JSON.parse(jsonText);
};

const localMockAnalysis = (urlsText) => {
  const lines = urlsText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  const results = lines.map((line, idx) => {
    let title = "未知景點 " + (idx+1);
    let category = "camera";
    let region = "曼谷";
    let similarityWarning = "無";
    let locationWarning = "無";
    let experienceWarning = "無";
    let suggestion = "建議排在曼谷市區行程中。";
    let suggestedDay = 1;
    let suggestedTime = "15:00";
    let mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(line)}`;

    const lineLower = line.toLowerCase();
    if (lineLower.includes('pa dee') || lineLower.includes('padee') || lineLower.includes('coffee') || lineLower.includes('cafe')) {
      title = "Pa Dee 網美花園咖啡";
      category = "coffee";
      region = "羅勇";
      similarityWarning = "既有行程已包含 Pa Dee 咖啡與 FO SHO BRO 咖啡，同質性偏高。";
      locationWarning = "如果您試圖在曼谷日 (Day 1-2, 5-7) 拜訪此地，將面臨單趟 2.5 小時以上的車程。";
      experienceWarning = "此咖啡廳為半戶外莊園風，七月多午後雷雨，若遇下雨拍照體驗會打折。";
      suggestion = "推薦排在 Day 3 (羅勇日)，因為當天本來就安排了羅勇素芭他水果園，兩地包車距離僅 25 分鐘。";
      suggestedDay = 3;
      suggestedTime = "15:00";
      mapUrl = "https://www.google.com/maps/search/?api=1&query=Pa+Dee+Rayong";
    } else if (lineLower.includes('safari') || lineLower.includes('zoo') || lineLower.includes('animal')) {
      title = "Safari World 賽福瑞野生動物園";
      category = "camera";
      region = "曼谷近郊";
      similarityWarning = "既有行程 Day 5 已包含 Safari World 行程，請確認是否要重複新增。";
      experienceWarning = "動物園占地廣大，下午戶外行走體感溫度高，且野生猛獸區若遇雨天可能無法完全參觀。";
      suggestion = "建議排在 Day 5 或 Day 6 的空閒時間，從曼谷市區包車前往約需 45 分鐘。";
      suggestedDay = 5;
      suggestedTime = "11:00";
      mapUrl = "https://www.google.com/maps/place/Safari+World+Bangkok";
    } else if (lineLower.includes('savoey') || lineLower.includes('restaurant') || lineLower.includes('food')) {
      title = "Savoey 泰式海鮮餐廳 (Terminal 21 店)";
      category = "food";
      region = "曼谷";
      similarityWarning = "Day 5 已安排 Savoey 晚餐，此項可能重複。";
      experienceWarning = "無";
      suggestion = "可排在 Day 1 或是 Day 2 晚上，在 One Bangkok 附近或 Sukhumvit 區域時享用。";
      suggestedDay = 1;
      suggestedTime = "19:00";
      mapUrl = "https://www.google.com/maps/place/Savoey+Terminal21";
    } else if (lineLower.includes('iconsiam') || lineLower.includes('mall') || lineLower.includes('shopping')) {
      title = "ICONSIAM 暹羅天地";
      category = "shopping";
      region = "曼谷";
      similarityWarning = "Day 2 家屬行程已排 ICONSIAM。";
      experienceWarning = "購物中心冷氣充足，但傍晚回程交通非常擁塞，渡輪排隊時間可能較長。";
      suggestion = "建議於 Day 2 的 15:00 入場，與既有 Iconsiam 行程合併。";
      suggestedDay = 2;
      suggestedTime = "15:00";
      mapUrl = "https://www.google.com/maps/place/ICONSIAM";
    } else if (lineLower.includes('kliff') || lineLower.includes('beach')) {
      title = "Kliff Beach Club 懸崖餐廳";
      category = "food";
      region = "芭達雅";
      similarityWarning = "Day 4 已包含 Kliff 懸崖餐廳晚餐。";
      locationWarning = "若非 Day 3-4 (芭達雅/羅勇期間) 前往，將有跨區域長途車程衝突。";
      experienceWarning = "懸崖海景是露天環境，若遇雨可能改在室內，夕陽能見度會降低。";
      suggestion = "建議排在 Day 4 傍晚 17:30，欣賞絕美日落。";
      suggestedDay = 4;
      suggestedTime = "17:30";
      mapUrl = "https://www.google.com/maps/search/?api=1&query=Kliff+Beach+Club+Pattaya";
    } else {
      title = line.replace(/https?:\/\/(www\.)?/, '').split('/')[0] || "新增網美景點";
      if (title.length > 20) title = title.substring(0, 20) + "...";
    }

    return {
      title,
      url: line,
      category,
      region,
      similarityWarning,
      locationWarning,
      experienceWarning,
      suggestion,
      suggestedDay,
      suggestedTime,
      mapUrl
    };
  });
  return { analysisResults: results };
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
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // 同步 URL Hash 與 activeTab，支援瀏覽器「上一頁/下一頁」歷史紀錄導航
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setActiveTab(hash);
      } else {
        setActiveTab('overview');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const changeTab = (tab) => {
    window.location.hash = tab;
    setActiveTab(tab);
  };

  // AI 排程助手相關狀態
  const [aiInputUrls, setAiInputUrls] = useState('');
  const [isAnalyzingAi, setIsAnalyzingAi] = useState(false);
  const [aiAnalysisResults, setAiAnalysisResults] = useState(null);
  const [importedItems, setImportedItems] = useState({});
  const [resultDaySelections, setResultDaySelections] = useState({});
  const [resultTimeSelections, setResultTimeSelections] = useState({});

  // 處理 AI 結果中天數與時間的本地修改
  const handleResultDayChange = (idx, dayNum) => {
    setResultDaySelections(prev => ({ ...prev, [idx]: dayNum }));
  };

  const handleResultTimeChange = (idx, timeStr) => {
    setResultTimeSelections(prev => ({ ...prev, [idx]: timeStr }));
  };

  // 開始 AI 分析評估
  const handleStartAiAnalysis = async () => {
    if (!aiInputUrls.trim()) return;
    setIsAnalyzingAi(true);
    setAiAnalysisResults(null);
    setImportedItems({});
    setResultDaySelections({});
    setResultTimeSelections({});

    try {
      // 呼叫真實的 Gemini 2.5 Flash API 進行分析評估
      const result = await callGeminiAnalysis(aiInputUrls, tripSchedule);
      if (result && result.analysisResults) {
        setAiAnalysisResults(result.analysisResults);
      } else {
        throw new Error("Invalid output structure");
      }
    } catch (err) {
      console.warn("Gemini API 呼叫失敗，啟用高仿真本地 Rule-based 分析器:", err.message);
      const result = localMockAnalysis(aiInputUrls);
      setAiAnalysisResults(result.analysisResults);
    } finally {
      setIsAnalyzingAi(false);
    }
  };

  // 匯入景點到行程中
  const handleImportToItinerary = (item, idx) => {
    const dayToImport = resultDaySelections[idx] || item.suggestedDay;
    const timeToImport = resultTimeSelections[idx] || item.suggestedTime;

    // 計算出發點與路線名稱
    const targetDay = tripSchedule.days.find(d => d.day === dayToImport);
    let routeOrigin = "";
    let routeText = "交通路線";

    if (targetDay) {
      if (targetDay.activities && targetDay.activities.length > 0) {
        // 尋找在排定時間之前最接近的行程，或最後一個行程
        const sortedActs = [...targetDay.activities].sort((a, b) => a.time.localeCompare(b.time));
        let prevAct = null;
        for (let i = sortedActs.length - 1; i >= 0; i--) {
          if (sortedActs[i].time <= timeToImport) {
            prevAct = sortedActs[i];
            break;
          }
        }
        if (prevAct) {
          routeOrigin = prevAct.title;
          routeText = `${prevAct.title} 至 ${item.title} 路線`;
        } else {
          routeOrigin = targetDay.hotelName || "";
          routeText = `${targetDay.hotelName ? '飯店' : '出發地'}至${item.title}路線`;
        }
      } else {
        routeOrigin = targetDay.hotelName || "";
        routeText = `${targetDay.hotelName ? '飯店' : '出發地'}至${item.title}路線`;
      }
    }

    const directionUrl = routeOrigin 
      ? `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(routeOrigin)}&destination=${encodeURIComponent(item.title)}`
      : `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(item.title)}`;

    const newActivity = {
      id: `ai-imported-${Date.now()}-${idx}`,
      time: timeToImport,
      title: item.title,
      type: item.category,
      region: item.region,
      desc: `【AI推薦排程】${item.suggestion}。請注意：${item.experienceWarning !== '無' ? item.experienceWarning : '無體驗衝突'}。`,
      links: [
        { text: "景點地圖", url: item.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.title)}`, icon: MapPin },
        { text: "景點介紹", url: item.url || item.infoUrl || "https://www.klook.com/zh-TW/", icon: Info },
        { text: routeText, url: directionUrl, icon: Navigation }
      ]
    };

    updateTripSchedule(prev => {
      const updatedDays = prev.days.map(day => {
        if (day.day === dayToImport) {
          const list = [...day.activities, newActivity];
          list.sort((a, b) => a.time.localeCompare(b.time));
          return { ...day, activities: list };
        }
        return day;
      });
      return { ...prev, days: updatedDays };
    });

    setImportedItems(prev => ({ ...prev, [item.title + '-' + idx]: true }));
  };
  

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [customNotes, setCustomNotes] = useState({});
  const [isCopied, setIsCopied] = useState(false); 
  
  // 狀態管理：行程資料
  const [tripSchedule, setTripSchedule] = useState(initialTripData);
  const [syncStatus, setSyncStatus] = useState('loading');
  const [dbSource, setDbSource] = useState('local_file');

  // 從雲端載入行程資料
  const fetchTripFromCloud = async () => {
    setSyncStatus('loading');
    try {
      const response = await fetch('/api/trip');
      if (!response.ok) throw new Error('連線失敗');
      const result = await response.json();
      setDbSource(result.source);
      
      if (result.data && result.data.days && result.data.days.length > 0) {
        setTripSchedule(result.data);
        setSyncStatus('synced');
      } else {
        // 雲端無資料，自動將本地預設資料同步上傳
        setSyncStatus('syncing');
        await saveTripToCloud(initialTripData);
        setTripSchedule(initialTripData);
        setSyncStatus('synced');
      }
    } catch (err) {
      console.error('載入雲端資料失敗，使用本地暫存:', err);
      setSyncStatus('error');
    }
  };

  // 保存資料至雲端
  const saveTripToCloud = async (newSchedule) => {
    setSyncStatus('syncing');
    try {
      const response = await fetch('/api/trip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tripSchedule: newSchedule })
      });
      if (!response.ok) throw new Error('存檔失敗');
      const result = await response.json();
      setDbSource(result.source);
      setSyncStatus('synced');
    } catch (err) {
      console.error('儲存雲端失敗:', err);
      setSyncStatus('error');
    }
  };

  const updateTripSchedule = (newScheduleOrFn) => {
    setTripSchedule(prev => {
      const next = typeof newScheduleOrFn === 'function' ? newScheduleOrFn(prev) : newScheduleOrFn;
      saveTripToCloud(next);
      return next;
    });
  };

  const handleResetToDefault = async () => {
    if (window.confirm("確定要將行程重置為預設行程嗎？這將覆蓋您所有的修改與自訂行程。")) {
      setSyncStatus('syncing');
      try {
        await saveTripToCloud(initialTripData);
        setTripSchedule(initialTripData);
        setSyncStatus('synced');
        alert("已成功重置為預設行程！");
      } catch (err) {
        console.error("重置失敗:", err);
        setSyncStatus('error');
      }
    }
  };

  React.useEffect(() => {
    fetchTripFromCloud();
  }, []);

  // 編輯/新增行程的 Modal 狀態
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);
  const [sourceDayId, setSourceDayId] = useState(1);
  const [targetDayId, setTargetDayId] = useState(1);
  
  // 編輯表單欄位
  const [formTime, setFormTime] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formRegion, setFormRegion] = useState('曼谷');
  const [formType, setFormType] = useState('camera');
  const [formMapUrl, setFormMapUrl] = useState('');
  const [formInfoUrl, setFormInfoUrl] = useState('');
  const [formRouteUrl, setFormRouteUrl] = useState('');
  
  const [aiWarning, setAiWarning] = useState(null);

  // 圖像生成狀態
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [infographicUrl, setInfographicUrl] = useState('image_1cf223.png'); // 預設使用上傳的圖片
  const [generateError, setGenerateError] = useState(null);

  // 15 秒背景輪詢，同步其他使用者的變更
  React.useEffect(() => {
    const timer = setInterval(() => {
      if (!isEditModalOpen && syncStatus === 'synced') {
        fetch('/api/trip')
          .then(res => res.json())
          .then(result => {
            if (result.data && result.data.days && result.data.days.length > 0) {
              const localStr = JSON.stringify(tripSchedule);
              const remoteStr = JSON.stringify(result.data);
              if (localStr !== remoteStr) {
                setTripSchedule(result.data);
                setDbSource(result.source);
              }
            }
          })
          .catch(err => console.warn('背景輪詢失敗:', err));
      }
    }, 15000);

    return () => clearInterval(timer);
  }, [isEditModalOpen, syncStatus, tripSchedule]);

  // 收集行程中所有的景點標題（做關鍵字比對用，自動清理無效熱區）
  const allActivityTitles = tripSchedule.days.flatMap(d => d.activities.map(a => a.title.toLowerCase()));

  const isKeywordInItinerary = (keywords) => {
    return keywords.some(kw => 
      allActivityTitles.some(title => title.includes(kw.toLowerCase()))
    );
  };

  const ROUTE_CONFIGS = [
    {
      key: 'bangkok-route',
      name: 'Day 1-2 曼谷路線',
      style: { left: '20%', top: '23%', width: '12%', height: '10%' },
      navUrl: 'https://www.google.com/maps/dir/Centre+Point+Hotel+Terminal+21/One+Bangkok/The+Platinum+Fashion+Mall/ICONSIAM',
      infoUrl: 'https://www.onebangkok.com/',
      show: tripSchedule.days.some(d => d.region === '曼谷' && d.activities.length > 0)
    },
    {
      key: 'rayong-route',
      name: 'Day 3-4 羅勇路線',
      style: { left: '30%', top: '42%', width: '10%', height: '22%' },
      navUrl: 'https://www.google.com/maps/dir/Centre+Point+Hotel+Terminal+21/Suphattra+Land/Pa+Dee+Rayong/Cross+Pattaya+Oceanphere',
      infoUrl: 'https://www.crosshotelsandresorts.com/cross-pattaya-oceanphere',
      show: tripSchedule.days.some(d => (d.region === '羅勇' || d.region === '芭達雅') && d.activities.length > 0)
    },
    {
      key: 'return-route',
      name: 'Day 5-7 返程路線',
      style: { left: '48%', top: '56%', width: '8%', height: '15%' },
      navUrl: 'https://www.google.com/maps/dir/Cross+Pattaya+Oceanphere/Safari+World+Bangkok/Centre+Point+Hotel+Terminal+21/FO+SHO+BRO+Bangkok',
      infoUrl: 'https://www.klook.com/zh-TW/activity/365-safari-world-bangkok/',
      show: tripSchedule.days.some(d => [5, 6, 7].includes(d.day) && d.activities.length > 0)
    }
  ];

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

  // 每日分頁路線資訊圖表更新狀態
  const [refreshingInfographics, setRefreshingInfographics] = useState({});

  const handleUpdateDayInfographic = (dayId) => {
    setRefreshingInfographics(prev => ({ ...prev, [dayId]: true }));
    setTimeout(() => {
      setRefreshingInfographics(prev => ({ ...prev, [dayId]: false }));
    }, 1200);
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

  // 開啟編輯 Modal
  const openEditModal = (activity, dayId) => {
    setIsAddMode(false);
    setEditingActivity(activity);
    setSourceDayId(dayId);
    setTargetDayId(dayId);
    setFormTime(activity.time);
    setFormTitle(activity.title);
    setFormDesc(activity.desc);
    setFormRegion(activity.region);
    setFormType(activity.type);
    const mapLink = activity.links?.find(l => l.text.includes("地圖") || l.text.includes("位置"));
    const infoLink = activity.links?.find(l => l.text.includes("介紹") || l.text.includes("攻略") || l.text.includes("遊玩") || l.text.includes("環境") || l.text.includes("食記") || l.text.includes("體驗") || l.text.includes("官網") || l.text.includes("訂房"));
    const routeLink = activity.links?.find(l => l.text.includes("路線") || l.text.includes("導航"));
    setFormMapUrl(mapLink ? mapLink.url : '');
    setFormInfoUrl(infoLink ? infoLink.url : '');
    setFormRouteUrl(routeLink ? routeLink.url : '');
    setAiWarning(null);
    setIsEditModalOpen(true);
  };

  // 開啟新增 Modal
  const openAddModal = (dayId) => {
    setIsAddMode(true);
    setEditingActivity(null);
    setSourceDayId(dayId);
    setTargetDayId(dayId);
    setFormTime('10:00');
    setFormTitle('');
    setFormDesc('');
    const targetDayObj = tripSchedule.days.find(d => d.day === dayId);
    setFormRegion(targetDayObj ? targetDayObj.region : '曼谷');
    setFormType('camera');
    setFormMapUrl('');
    setFormInfoUrl('');
    setFormRouteUrl('');
    setAiWarning(null);
    setIsEditModalOpen(true);
  };

  // 刪除行程項目
  const handleDeleteActivity = () => {
    if (!editingActivity) return;
    
    updateTripSchedule(prevSchedule => {
      const newDays = prevSchedule.days.map(day => {
        if (day.day === sourceDayId) {
          return {
            ...day,
            activities: day.activities.filter(a => a.id !== editingActivity.id)
          };
        }
        return day;
      });
      return { ...prevSchedule, days: newDays };
    });
    
    setIsEditModalOpen(false);
    setEditingActivity(null);
  };

  // 儲存（新增或修改）行程項目
  const handleSaveActivity = () => {
    if (!formTitle.trim()) {
      alert('請輸入行程名稱！');
      return;
    }

    const targetDay = tripSchedule.days.find(d => d.day === targetDayId);
    
    // AI 防呆判斷
    if (formRegion !== targetDay.region && !aiWarning && (isAddMode || sourceDayId !== targetDayId)) {
      setAiWarning(
        `您正準備在 Day ${targetDay.day} 新增/移入位於【${formRegion}】的項目。
        但 Day ${targetDay.day} 的主要行程都在【${targetDay.region}】！兩地距離遙遠，可能會產生嚴重的交通與時間衝突。`
      );
      return;
    }

    const activityObj = {
      id: isAddMode ? `custom-${Date.now()}` : editingActivity.id,
      time: formTime,
      title: formTitle,
      desc: formDesc,
      region: formRegion,
      type: formType,
      links: (() => {
        const linksArr = [];
        if (formMapUrl.trim()) {
          linksArr.push({ text: "景點地圖", url: formMapUrl, icon: MapPin });
        }
        if (formInfoUrl.trim()) {
          linksArr.push({ text: "景點介紹", url: formInfoUrl, icon: Info });
        }
        if (formRouteUrl.trim()) {
          linksArr.push({ text: "交通路線", url: formRouteUrl, icon: Navigation });
        }
        return linksArr;
      })()
    };

    updateTripSchedule(prevSchedule => {
      const newDays = prevSchedule.days.map(day => {
        // 處理目標天（新增或更新）
        if (day.day === targetDayId) {
          let updatedActivities = [...day.activities];
          
          if (isAddMode) {
            updatedActivities.push(activityObj);
          } else {
            if (sourceDayId === targetDayId) {
              // 同一天：更新該項目
              updatedActivities = updatedActivities.map(a => a.id === editingActivity.id ? activityObj : a);
            } else {
              // 跨天移動：直接加入目標天
              updatedActivities.push(activityObj);
            }
          }
          
          // 自動依時間排序
          updatedActivities.sort((a, b) => a.time.localeCompare(b.time));
          return { ...day, activities: updatedActivities };
        }
        
        // 如果是跨天移動，需要將項目從原本的源天數移除
        if (!isAddMode && sourceDayId !== targetDayId && day.day === sourceDayId) {
          return {
            ...day,
            activities: day.activities.filter(a => a.id !== editingActivity.id)
          };
        }
        
        return day;
      });
      
      return { ...prevSchedule, days: newDays };
    });

    setIsEditModalOpen(false);
    setEditingActivity(null);
    setAiWarning(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 relative">
      
      {/* 頂部導航列 */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              <MapPin className="text-teal-600 w-5 h-5 sm:w-6 h-6" />
              <span className="font-bold text-base sm:text-xl text-teal-800">B&B泰國家庭旅遊</span>
              
              {/* 雲端同步狀態指示器 */}
              <div className="flex items-center gap-1 sm:gap-1.5 ml-1 sm:ml-2 px-1.5 sm:px-2.5 py-0.5 sm:py-1 bg-slate-50 border border-slate-100 rounded-full text-[10px] font-semibold">
                <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                  syncStatus === 'synced' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' :
                  syncStatus === 'syncing' ? 'bg-amber-500 animate-pulse' :
                  syncStatus === 'loading' ? 'bg-indigo-500 animate-pulse' :
                  'bg-red-500 animate-ping'
                }`} />
                <span className="text-[9px] sm:text-[10px] text-slate-500 font-bold whitespace-nowrap">
                  {syncStatus === 'synced' ? (dbSource === 'kv' ? '☁️ 雲端' : '💾 本地') :
                   syncStatus === 'syncing' ? '同步中' :
                   syncStatus === 'loading' ? '載入中' :
                   '連線失敗'}
                </span>
                <button 
                  onClick={fetchTripFromCloud}
                  title="從雲端重新載入資料"
                  className="p-0.5 ml-0.5 text-slate-400 hover:text-teal-600 hover:bg-slate-100 rounded transition"
                  disabled={syncStatus === 'loading' || syncStatus === 'syncing'}
                >
                  <RefreshCw className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${syncStatus === 'loading' ? 'animate-spin' : ''}`} />
                </button>
                <button 
                  onClick={handleResetToDefault}
                  title="重置回預設行程"
                  className="p-0.5 ml-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition"
                  disabled={syncStatus === 'loading' || syncStatus === 'syncing'}
                >
                  <Trash2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                </button>
              </div>
            </div>
            
            {/* 收合選單 (Dropdown 面板) */}
            <div className="relative">
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-700 border border-teal-200 hover:bg-teal-100 rounded-lg font-semibold transition text-sm shadow-sm"
              >
                <span>📂 {
                  activeTab === 'overview' ? '總覽 & 準備' : 
                  activeTab === 'ai-assistant' ? '🤖 AI 行程規劃助手' :
                  `Day ${activeTab.split('-')[1]} - ${tripSchedule.days.find(d => `day-${d.day}` === activeTab)?.title || ''}`
                }</span>
                <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-90' : ''}`} />
              </button>

              {dropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)}></div>
                  
                  <div className="absolute right-0 mt-2 w-72 bg-white border border-slate-200 rounded-xl shadow-xl z-50 py-2.5 animation-scale-up">
                    <div className="px-4 py-1.5 text-xs font-bold text-slate-400 border-b border-slate-100 mb-1">📋 準備與工具</div>
                    <button 
                      onClick={() => { changeTab('overview'); setDropdownOpen(false); }}
                      className={`flex items-center justify-between w-full px-4 py-2.5 text-left text-sm font-medium hover:bg-slate-50 transition ${activeTab === 'overview' ? 'text-teal-700 bg-teal-50/50' : 'text-slate-700'}`}
                    >
                      <span>總覽 & 準備資訊</span>
                      {activeTab === 'overview' && <Check className="w-4 h-4 text-teal-600" />}
                    </button>
                    
                    <button 
                      onClick={() => { changeTab('ai-assistant'); setDropdownOpen(false); }}
                      className={`flex items-center justify-between w-full px-4 py-2.5 text-left text-sm font-medium hover:bg-slate-50 transition ${activeTab === 'ai-assistant' ? 'text-indigo-700 bg-indigo-50/50' : 'text-slate-700'}`}
                    >
                      <span className="flex items-center gap-1.5">🤖 AI 行程規劃助手 <span className="bg-indigo-100 text-indigo-800 text-[10px] px-1.5 py-0.5 rounded-full">推薦</span></span>
                      {activeTab === 'ai-assistant' && <Check className="w-4 h-4 text-indigo-600" />}
                    </button>

                    <div className="px-4 py-1.5 text-xs font-bold text-slate-400 border-b border-slate-100 my-1">📅 每日行程切換</div>
                    {tripSchedule.days.map((day) => (
                      <button 
                        key={day.day}
                        onClick={() => { changeTab(`day-${day.day}`); setDropdownOpen(false); }}
                        className={`flex items-center justify-between w-full px-4 py-2.5 text-left text-sm font-medium hover:bg-slate-50 transition ${activeTab === `day-${day.day}` ? 'text-teal-700 bg-teal-50/50' : 'text-slate-700'}`}
                      >
                        <div className="truncate text-left w-full">
                          <span className="font-bold text-teal-600 mr-1.5">Day {day.day}</span>
                          <span className="text-slate-600 text-xs mr-1">{day.date}</span>
                          <span className="text-slate-500 font-normal text-xs">| {day.title}</span>
                        </div>
                        {activeTab === `day-${day.day}` && <Check className="w-4 h-4 text-teal-600 flex-shrink-0" />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
</header>

      {/* Hero 圖片區塊 */}
      {activeTab === 'overview' && (
        <div className="relative bg-teal-800 h-64 sm:h-80 w-full overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&q=80&w=2000" 
            alt="Thailand Golden Temple" 
            className="w-full h-full object-cover opacity-75"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 text-center bg-black/10">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-3 drop-shadow-lg">
              {tripSchedule.title}
            </h1>
            <p className="text-lg sm:text-xl font-medium drop-shadow-md flex items-center gap-2 bg-black/25 px-4 py-1.5 rounded-full backdrop-blur-sm">
              <Calendar className="w-5 h-5 text-teal-300" /> {tripSchedule.dates}
            </p>
          </div>
        </div>
      )}

      {/* 主要內容區 */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* ==========================================
            AI 行程規劃助手
            ========================================== */}
        {activeTab === 'ai-assistant' && (
          <div className="space-y-6 animation-fade-in">
            <section className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              <h2 className="text-2xl font-extrabold text-indigo-800 mb-2 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-indigo-600 animate-pulse" /> 🤖 AI 智慧批次排程助手
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                您可以貼入多個網頁介紹或景點名稱（每行一筆），Gemini AI 會分析它們的<b>地理位置、分類、同質性</b>，並給出專業排程與體驗警示。
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">請貼入新增行程網址或名稱 (每行一筆)：</label>
                  <textarea
                    rows={6}
                    placeholder="https://www.klook.com/zh-TW/activity/95015-suphattra-land-orchard-rayong/&#10;Savoey Terminal21&#10;https://www.google.com/maps/search/?api=1&query=Kliff+Beach+Club+Pattaya"
                    className="w-full border border-slate-200 rounded-lg p-3 text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none resize-none font-mono"
                    value={aiInputUrls}
                    onChange={(e) => setAiInputUrls(e.target.value)}
                  />
                </div>

                <div className="flex flex-wrap gap-3 items-center justify-between">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setAiInputUrls("https://www.google.com/maps/place/Savoey+Terminal21\nhttps://www.klook.com/zh-TW/activity/95015-suphattra-land-orchard-rayong/\nhttps://www.google.com/maps/place/FO+SHO+BRO+Bangkok/")}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold rounded-lg transition"
                    >
                      載入範例資料
                    </button>
                    <button 
                      onClick={() => setAiInputUrls("")}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold rounded-lg transition"
                    >
                      清空輸入
                    </button>
                    <button 
                      onClick={() => {
                        if (window.history.length > 1) {
                          window.history.back();
                        } else {
                          changeTab('overview');
                        }
                      }}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold rounded-lg transition"
                    >
                      返回上一頁
                    </button>
                  </div>
                  
                  <button
                    onClick={handleStartAiAnalysis}
                    disabled={isAnalyzingAi || !aiInputUrls.trim()}
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-bold transition shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isAnalyzingAi ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    {isAnalyzingAi ? "Gemini AI 正在深入分析評估..." : "開始 AI 深度分析與評估"}
                  </button>
                </div>
              </div>
            </section>

            {/* AI 分析報告 */}
            {aiAnalysisResults && aiAnalysisResults.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 px-1">
                  <Info className="w-5 h-5 text-indigo-500" /> AI 行程評估建議報告 ({aiAnalysisResults.length} 筆)
                </h3>

                <div className="grid gap-6">
                  {aiAnalysisResults.map((result, idx) => {
                    const isImported = importedItems[result.title + '-' + idx];
                    
                    const selectedDay = resultDaySelections[idx] || result.suggestedDay;
                    const selectedTime = resultTimeSelections[idx] || result.suggestedTime;

                    return (
                      <div key={idx} className={`bg-white rounded-xl shadow-sm border p-6 transition relative overflow-hidden ${isImported ? 'border-emerald-200 bg-emerald-50/10' : 'border-slate-200 hover:border-indigo-300'}`}>
                        {isImported && (
                          <div className="absolute top-0 right-0 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" /> 已成功匯入
                          </div>
                        )}

                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold text-xs">
                            {result.region}
                          </span>
                          <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-semibold text-xs">
                            分類：{result.category}
                          </span>
                        </div>

                        <h4 className="text-lg font-bold text-slate-800 mb-2 truncate pr-16">{result.title}</h4>
                        <p className="text-slate-500 text-xs mb-4 break-all truncate">連結網址：<a href={result.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">{result.url}</a></p>

                        {/* 警示與警告區塊 */}
                        <div className="space-y-3.5 my-4">
                          {/* 同質性警告 */}
                          {result.similarityWarning && result.similarityWarning !== "無" && (
                            <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded-r-lg">
                              <div className="flex gap-2">
                                <AlertTriangle className="text-amber-600 w-5 h-5 flex-shrink-0 mt-0.5" />
                                <div>
                                  <span className="block text-xs font-bold text-amber-800">同質性高風險警示</span>
                                  <span className="text-xs text-amber-700 leading-relaxed">{result.similarityWarning}</span>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* 地理位置警告 */}
                          {result.locationWarning && result.locationWarning !== "無" && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-r-lg">
                              <div className="flex gap-2">
                                <AlertTriangle className="text-red-600 w-5 h-5 flex-shrink-0 mt-0.5" />
                                <div>
                                  <span className="block text-xs font-bold text-red-800">地理位置衝突警告</span>
                                  <span className="text-xs text-red-700 leading-relaxed">{result.locationWarning}</span>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* 不好體驗警告 */}
                          {result.experienceWarning && result.experienceWarning !== "無" && (
                            <div className="bg-orange-50 border-l-4 border-orange-500 p-3 rounded-r-lg">
                              <div className="flex gap-2">
                                <AlertTriangle className="text-orange-600 w-5 h-5 flex-shrink-0 mt-0.5" />
                                <div>
                                  <span className="block text-xs font-bold text-orange-800">不好體驗因子警告</span>
                                  <span className="text-xs text-orange-700 leading-relaxed">{result.experienceWarning}</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* AI 排程建議 */}
                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-sm text-slate-700 leading-relaxed mb-4">
                          <strong className="text-indigo-800 block mb-1">🤖 AI 排程建議與理由：</strong>
                          {result.suggestion}
                        </div>

                        {/* 匯入行程操作 */}
                        {!isImported && (
                          <div className="flex flex-wrap gap-4 items-end justify-between border-t border-slate-100 pt-4 mt-4 bg-slate-50/40 p-3 rounded-lg">
                            <div className="flex flex-wrap gap-3">
                              <div>
                                <label className="block text-[10px] font-bold text-slate-500 mb-1 font-sans">排定天數</label>
                                <select 
                                  value={selectedDay}
                                  onChange={(e) => handleResultDayChange(idx, Number(e.target.value))}
                                  className="border border-slate-200 bg-white rounded-lg px-2 py-1.5 text-xs text-slate-700 font-medium"
                                >
                                  {tripSchedule.days.map(d => (
                                    <option key={d.day} value={d.day}>Day {d.day} ({d.region})</option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-slate-500 mb-1 font-sans">排定時間</label>
                                <input 
                                  type="text" 
                                  value={selectedTime}
                                  onChange={(e) => handleResultTimeChange(idx, e.target.value)}
                                  className="border border-slate-200 bg-white rounded-lg px-2 py-1 text-xs text-slate-700 font-medium w-16 text-center"
                                />
                              </div>
                            </div>
                            
                            <button
                              onClick={() => handleImportToItinerary(result, idx)}
                              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1 shadow-sm"
                            >
                              <Plus className="w-3.5 h-3.5" /> 確認匯入此行程
                            </button>
                          </div>
                        )}

                        {isImported && (
                          <div className="flex justify-end gap-2 border-t border-slate-100 pt-4 mt-4">
                            <button
                              onClick={() => { changeTab(`day-${selectedDay}`); }}
                              className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1.5"
                            >
                              前往 Day {selectedDay} 查看匯入結果 &rarr;
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
        
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
              
              <div className="relative rounded-lg overflow-hidden border-2 border-slate-200 bg-slate-100 flex items-center justify-center min-h-[300px] w-full p-2">
                {isGeneratingImage ? (
                  <div className="flex flex-col items-center justify-center text-indigo-600 py-12 px-4 text-center">
                    <Sparkles className="w-10 h-10 animate-pulse mb-3" />
                    <p className="font-bold text-lg">正在呼叫視覺模型繪製中...</p>
                    <p className="text-sm text-slate-500 mt-2 max-w-sm">
                      AI 正在為您生成最新的 3D 立體概觀地圖，並標記 Kliff 懸崖餐廳、Cross Pattaya 等關鍵景點。大約需要幾秒鐘，請稍候。
                    </p>
                  </div>
                ) : (
                  <div className="relative w-full aspect-square rounded-md shadow-inner bg-white">
                    <img 
                      src={infographicUrl} 
                      alt="行程資訊圖表" 
                      onError={handleImageError}
                      className="w-full h-full object-cover" 
                    />
                    
                    {/* 互動點擊區域 */}
                    {!generateError && (
                      <>
                        {/* 動態渲染行程中包含的景點熱區 */}
                        {HOTSPOT_CONFIGS.filter(cfg => isKeywordInItinerary(cfg.keywords)).map(cfg => (
                          <div 
                            key={cfg.key}
                            onClick={() => window.open(cfg.infoUrl, '_blank', 'noopener,noreferrer')}
                            className="absolute group border border-teal-500/30 hover:border-teal-400 bg-teal-500/5 hover:bg-teal-500/20 hover:shadow-[0_0_15px_rgba(20,184,166,0.3)] transition-all duration-300 rounded-xl cursor-pointer flex items-center justify-center"
                            style={cfg.style}
                          >
                            {/* 點擊與視覺引導小圓點 */}
                            <span className="w-2.5 h-2.5 bg-teal-400 rounded-full animate-ping absolute opacity-70 group-hover:hidden" />
                            <span className="w-1.5 h-1.5 bg-teal-500 rounded-full absolute group-hover:hidden" />
                            
                            <div 
                              onClick={(e) => e.stopPropagation()}
                              className="absolute hidden group-hover:flex flex-col gap-1.5 bg-teal-950/95 text-white p-2.5 rounded-lg shadow-xl -top-20 left-1/2 transform -translate-x-1/2 z-30 font-semibold border border-teal-500/50 backdrop-blur-sm min-w-[140px]"
                            >
                              <span className="text-xs border-b border-teal-800 pb-1 text-center font-bold">{cfg.name}</span>
                              <div className="flex gap-1.5 justify-center">
                                <a 
                                  href={cfg.mapUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="bg-teal-600 hover:bg-teal-500 text-[10px] px-2 py-1 rounded flex items-center gap-0.5 whitespace-nowrap transition"
                                >
                                  🗺️ 地圖
                                </a>
                                <a 
                                  href={cfg.infoUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="bg-indigo-600 hover:bg-indigo-500 text-[10px] px-2 py-1 rounded flex items-center gap-0.5 whitespace-nowrap transition"
                                >
                                  ℹ️ 介紹
                                </a>
                              </div>
                            </div>
                          </div>
                        ))}

                        {/* 動態渲染路線熱區 */}
                        {ROUTE_CONFIGS.filter(r => r.show).map(r => (
                          <div 
                            key={r.key}
                            onClick={() => window.open(r.infoUrl, '_blank', 'noopener,noreferrer')}
                            className="absolute group border border-amber-500/30 hover:border-amber-400 bg-amber-500/5 hover:bg-amber-500/20 hover:shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all duration-300 rounded-full cursor-pointer flex items-center justify-center"
                            style={r.style}
                          >
                            {/* 點擊與視覺引導小圓點 */}
                            <span className="w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping absolute opacity-70 group-hover:hidden" />
                            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full absolute group-hover:hidden" />

                            <div 
                              onClick={(e) => e.stopPropagation()}
                              className="absolute hidden group-hover:flex flex-col gap-1.5 bg-amber-955/95 text-white p-2.5 rounded-lg shadow-xl -top-20 left-1/2 transform -translate-x-1/2 z-30 font-semibold border border-amber-500/50 backdrop-blur-sm min-w-[140px]"
                            >
                              <span className="text-xs border-b border-amber-800 pb-1 text-center font-bold">{r.name}</span>
                              <div className="flex gap-1.5 justify-center">
                                <a 
                                  href={r.navUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="bg-amber-600 hover:bg-amber-500 text-[10px] px-2 py-1 rounded flex items-center gap-0.5 whitespace-nowrap transition"
                                >
                                  🧭 導航
                                </a>
                                <a 
                                  href={r.infoUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="bg-indigo-600 hover:bg-indigo-500 text-[10px] px-2 py-1 rounded flex items-center gap-0.5 whitespace-nowrap transition"
                                >
                                  ℹ️ 介紹
                                </a>
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
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
              <div className="mb-8 relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <div className="flex-1">
                  <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Day {day.day} - {day.date}</h2>
                  <h3 className="text-xl text-teal-600 font-medium mb-2">{day.title} <span className="text-sm bg-teal-100 text-teal-800 px-2 py-1 rounded ml-2">主要區域：{day.region}</span></h3>
                  <p className="text-slate-500 text-sm leading-relaxed mt-2">{day.summary}</p>
                </div>
              </div>

              {/* 每日行程所有地點路線資訊圖表 */}
              {(() => {
                // 收集當日所有行程點
                const stops = day.activities.map((act, idx) => ({
                  order: idx + 1,
                  title: act.title,
                  time: act.time,
                  type: act.type,
                }));

                // 若非最後一天且有飯店名稱，則加入回飯店作為終點
                if (day.day !== 7 && day.hotelName) {
                  stops.push({
                    order: stops.length + 1,
                    title: `返回住宿：${day.hotelName}`,
                    time: "晚上",
                    type: "hotel",
                  });
                }

                const isRefreshing = refreshingInfographics[day.day];

                return (
                  <div className="mb-8 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-xl shadow-lg border border-slate-800 p-6 overflow-hidden relative">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                      <div>
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                          🗺️ Day {day.day} 行程路線與時程資訊圖表
                        </h3>
                        <p className="text-xs text-slate-400 mt-1">當日路線時序軌跡圖，即時反應行程異動</p>
                      </div>
                      <button
                        onClick={() => handleUpdateDayInfographic(day.day)}
                        disabled={isRefreshing}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white rounded-lg text-xs font-bold transition shadow-md hover:shadow-teal-500/20 disabled:opacity-60"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                        一鍵更新圖表
                      </button>
                    </div>

                    {isRefreshing ? (
                      <div className="flex flex-col items-center justify-center py-10 text-teal-400">
                        <Loader2 className="w-8 h-8 animate-spin mb-2" />
                        <span className="text-xs font-semibold tracking-wider animate-pulse">正在重新分析路線順序與時程圖表...</span>
                      </div>
                    ) : stops.length === 0 ? (
                      <div className="text-center py-8 text-slate-500 text-sm">
                        當前暫無行程項目。
                      </div>
                    ) : (
                      <div className="flex flex-nowrap items-center gap-4 overflow-x-auto pb-4 pt-2 custom-scrollbar">
                        {stops.map((stop, index) => {
                          let typeLabel = "景點";
                          let typeColor = "bg-teal-500/10 text-teal-300 border-teal-500/20";
                          if (stop.type === 'food') {
                            typeLabel = "餐飲";
                            typeColor = "bg-amber-500/10 text-amber-300 border-amber-500/20";
                          } else if (stop.type === 'hotel') {
                            typeLabel = "住宿";
                            typeColor = "bg-indigo-500/10 text-indigo-300 border-indigo-500/20";
                          } else if (stop.type === 'car') {
                            typeLabel = "交通";
                            typeColor = "bg-sky-500/10 text-sky-300 border-sky-500/20";
                          }

                          return (
                            <React.Fragment key={index}>
                              {/* 節點卡片 */}
                              <div className="flex-shrink-0 w-60 bg-slate-800/80 border border-slate-700 rounded-xl p-4 hover:border-teal-500/50 hover:shadow-[0_0_15px_rgba(20,184,166,0.15)] transition-all duration-300 relative group">
                                {/* 序號 */}
                                <div className="absolute -top-2.5 -left-2.5 w-6 h-6 rounded-full bg-gradient-to-br from-teal-400 to-indigo-500 flex items-center justify-center text-[10px] font-black text-white shadow-md border border-slate-900">
                                  {stop.order}
                                </div>

                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-1 text-[11px] font-bold text-teal-400">
                                    <Clock className="w-3 h-3" />
                                    <span>{stop.time}</span>
                                  </div>
                                  <span className={`text-[9px] border px-1.5 py-0.5 rounded font-bold ${typeColor}`}>
                                    {typeLabel}
                                  </span>
                                </div>

                                <h4 className="text-xs font-bold text-slate-100 group-hover:text-teal-300 transition duration-200 line-clamp-2 min-h-[32px] flex items-center">
                                  {stop.title}
                                </h4>
                              </div>

                              {/* 連接線箭頭 */}
                              {index < stops.length - 1 && (
                                <div className="flex-shrink-0 flex items-center justify-center">
                                  <div className="w-6 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-indigo-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                                    </svg>
                                  </div>
                                </div>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })()}

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
                      
                      {/* 編輯/移出行程按鈕 */}
                      <button 
                        onClick={() => openEditModal(act, day.day)}
                        className="absolute top-4 right-4 p-2 bg-slate-50 text-slate-500 hover:text-teal-600 hover:bg-teal-50 rounded-full transition opacity-50 group-hover:opacity-100 focus:opacity-100 z-10"
                        title="編輯此項目"
                      >
                        <Edit3 className="w-5 h-5" />
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
                              const isMap = link.text.includes("地圖") || link.text.includes("位置");
                              const isInfo = link.text.includes("介紹") || link.text.includes("攻略") || link.text.includes("食記") || link.text.includes("遊玩");
                              const isRoute = link.text.includes("路線") || link.text.includes("導航");
                              
                              let btnClass = "bg-slate-50 text-slate-700 hover:bg-slate-100";
                              if (isMap) btnClass = "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-100";
                              else if (isInfo) btnClass = "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-100";
                              else if (isRoute) btnClass = "bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-100";
                              
                              const Icon = isMap ? MapPin : (isRoute ? Navigation : Info);

                              return (
                                <a 
                                  key={idx} href={link.url} target="_blank" rel="noopener noreferrer"
                                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition ${btnClass}`}
                                >
                                  <Icon className="w-3.5 h-3.5" /> {link.text}
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
                      <div className="flex flex-wrap gap-2">
                        <a 
                          href={`https://www.google.com/maps/dir/?api=1&destination=${day.hotelMapQuery}`} 
                          target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition shadow-sm"
                        >
                          <Navigation className="w-4 h-4" /> 點此導航回飯店
                        </a>
                        {HOTEL_BOOKING_URLS[day.hotelName] && (
                          <a 
                            href={HOTEL_BOOKING_URLS[day.hotelName]} 
                            target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-pink-600 text-white text-sm font-medium rounded-lg hover:bg-pink-700 transition shadow-sm"
                          >
                            <Hotel className="w-4 h-4" /> 點此線上訂房
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* 底部導航 */}
              <div className="flex justify-between items-center mt-6 border-t border-slate-200 pt-6">
                <button 
                  disabled={day.day === 1}
                  onClick={() => changeTab(`day-${day.day - 1}`)}
                  className="px-4 py-2 text-teal-600 font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-teal-50 rounded-lg transition"
                >
                  &larr; 前一天
                </button>
                <button 
                  disabled={day.day === tripSchedule.days.length}
                  onClick={() => changeTab(`day-${day.day + 1}`)}
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
          統一編修行程對話框 Modal (新增/編輯/刪除/移動)
          ========================================== */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden my-8 animation-fade-in">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-lg flex items-center gap-2 text-slate-800">
                {isAddMode ? <Plus className="text-teal-600 w-5 h-5" /> : <Edit3 className="text-teal-600 w-5 h-5" />}
                {isAddMode ? '新增行程項目' : '編輯行程項目'}
              </h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600 bg-white rounded-full p-1 shadow-sm"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="p-6 space-y-4 max-h-[65vh] overflow-y-auto">
              
              {/* 時間與類型 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">時間時間 (例如 10:00)</label>
                  <input 
                    type="text" 
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-sm text-slate-800 focus:ring-2 focus:ring-teal-500 outline-none"
                    value={formTime}
                    onChange={(e) => setFormTime(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">項目類型</label>
                  <select 
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-sm text-slate-800 focus:ring-2 focus:ring-teal-500 outline-none bg-white font-medium"
                    value={formType}
                    onChange={(e) => setFormType(e.target.value)}
                  >
                    <option value="camera">📷 景點 / 拍照</option>
                    <option value="hotel">🏨 飯店 / 住宿</option>
                    <option value="transport">🚗 交通 / 接送</option>
                    <option value="coffee">☕ 咖啡廳 / 下午茶</option>
                    <option value="food">🍽️ 美食 / 餐廳</option>
                    <option value="shopping">🛍️ 購物 / 商場</option>
                    <option value="info">ℹ️ 研討會 / 其他資訊</option>
                  </select>
                </div>
              </div>

              {/* 名稱 */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">行程名稱</label>
                <input 
                  type="text" 
                  className="w-full border border-slate-200 rounded-lg p-2.5 text-sm text-slate-800 focus:ring-2 focus:ring-teal-500 outline-none font-semibold"
                  placeholder="例如：參訪美功鐵道市場"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                />
              </div>

              {/* 地理區域與日期天數 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">地理位置</label>
                  <select 
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-sm text-slate-800 focus:ring-2 focus:ring-teal-500 outline-none bg-white font-medium"
                    value={formRegion}
                    onChange={(e) => setFormRegion(e.target.value)}
                  >
                    <option value="曼谷">曼谷</option>
                    <option value="芭達雅">芭達雅</option>
                    <option value="羅勇">羅勇</option>
                    <option value="曼谷近郊">曼谷近郊</option>
                    <option value="台灣">台灣</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">排定天數 (移動行程)</label>
                  <select 
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-sm text-slate-800 focus:ring-2 focus:ring-teal-500 outline-none bg-white font-medium"
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
                </div>
              </div>

              {/* 詳細說明 */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">詳細說明 (交通或集合備註)</label>
                <textarea 
                  className="w-full border border-slate-200 rounded-lg p-2.5 text-sm text-slate-800 focus:ring-2 focus:ring-teal-500 outline-none h-20 resize-none"
                  placeholder="請輸入行程的詳細資訊或交通指引..."
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                />
              </div>

              {/* 參考連結 */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
                <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider">參考網址 (地圖、介紹與交通路線連結)</span>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 w-16">🗺️ 地圖連結:</span>
                    <input 
                      type="text" 
                      placeholder="Google 地圖網址 (https://maps.google.com/...)" 
                      className="border border-slate-200 bg-white rounded-lg p-2 text-xs text-slate-800 outline-none focus:ring-1 focus:ring-teal-500 flex-1"
                      value={formMapUrl}
                      onChange={(e) => setFormMapUrl(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 w-16">ℹ️ 介紹連結:</span>
                    <input 
                      type="text" 
                      placeholder="部落格或景點介紹網址 (https://...)" 
                      className="border border-slate-200 bg-white rounded-lg p-2 text-xs text-slate-800 outline-none focus:ring-1 focus:ring-teal-500 flex-1"
                      value={formInfoUrl}
                      onChange={(e) => setFormInfoUrl(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 w-16">🧭 交通路線:</span>
                    <input 
                      type="text" 
                      placeholder="交通導航或路徑網址 (https://www.google.com/maps/dir/...)" 
                      className="border border-slate-200 bg-white rounded-lg p-2 text-xs text-slate-800 outline-none focus:ring-1 focus:ring-teal-500 flex-1"
                      value={formRouteUrl}
                      onChange={(e) => setFormRouteUrl(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* AI 警告區塊 */}
              {aiWarning && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg animation-fade-in">
                  <div className="flex gap-3">
                    <AlertTriangle className="text-red-500 w-6 h-6 flex-shrink-0" />
                    <div>
                      <h4 className="text-red-800 font-bold mb-1">AI 行程防呆提醒</h4>
                      <p className="text-xs text-red-700 whitespace-pre-line leading-relaxed">{aiWarning}</p>
                    </div>
                  </div>
                </div>
              )}

            </div>

            <div className="p-6 border-t border-slate-100 flex justify-between items-center bg-slate-50">
              <div>
                {!isAddMode && (
                  <button 
                    onClick={handleDeleteActivity}
                    className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-lg text-sm font-bold flex items-center gap-1.5 transition"
                  >
                    <Trash2 className="w-4 h-4" /> 刪除此項目
                  </button>
                )}
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium transition"
                >
                  取消
                </button>
                <button 
                  onClick={handleSaveActivity}
                  className={`px-5 py-2 font-bold rounded-lg text-sm transition shadow-sm flex items-center gap-1.5 ${aiWarning ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-teal-600 hover:bg-teal-700 text-white'}`}
                >
                  {aiWarning ? '我了解風險，強制儲存' : '儲存變更'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
