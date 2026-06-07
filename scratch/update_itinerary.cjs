const fs = require('fs');
const path = require('path');

const appJsxPath = path.join(__dirname, '..', 'src', 'App.jsx');
const dbPath = path.join(__dirname, 'local_kv_db.json');

// 1. Define the new initialTripData, HOTSPOT_CONFIGS and HOTEL_BOOKING_URLS block
const newTripDataAndHotspots = `const initialTripData = {
  title: "B&B泰國家庭旅遊",
  dates: "2026/07/14 - 2026/07/20",
  pax: "4人 (家庭旅遊)",
  requirements: [
    "7/15 需在 One Bangkok (SDConference) 附近",
    "住宿房型：兩間單人床 (Twin Room) x 2間",
    "必去：羅勇素芭他水果園、Pa Dee 咖啡、Kliff 餐廳、Cross Pattaya、羅摩耶那水上樂園",
    "飯店等級：3星級以上"
  ],
  days: [
    {
      day: 1,
      date: "7/14 (二)",
      title: "抵達曼谷、初探都會魅力",
      summary: "班機抵達曼谷，專車接送至市區飯店。下午探索全新地標 One Bangkok 與 Sathorn 森林秘境餐廳。",
      region: "曼谷",
      hotelName: "曼谷格蘭德中心點隆比尼飯店",
      hotelMapQuery: "Grande+Centre+Point+Lumpini",
      activities: [
        {
          id: "d1-1",
          time: "06:00",
          title: "抵達曼谷機場 (BKK)",
          type: "transport",
          region: "曼谷",
          desc: "搭乘預約的機場接送專車前往曼谷市區飯店寄放行李。辦理入境手續與行李提領。",
          links: [
            { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=Suvarnabhumi+Airport" },
            { text: "預訂接送", url: "https://www.klook.com/zh-TW/transport/airport-transfer/bangkok/" }
          ]
        },
        {
          id: "d1-2",
          time: "08:30",
          title: "抵達 曼谷格蘭德中心點隆比尼飯店 寄放行李",
          type: "hotel",
          region: "曼谷",
          desc: "位於地鐵 Lumphini 站旁，交通極其便利，可步行至 One Bangkok。寄放行李後開啟旅程。",
          links: [
            { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=Grande+Centre+Point+Lumpini" },
            { text: "飯店訂房", url: "https://tw.hotels.com/ho1258679072/" }
          ]
        },
        {
          id: "d1-3",
          time: "09:30",
          title: "隆比尼公園 (Lumphini Park) 散步",
          type: "camera",
          region: "曼谷",
          desc: "步行至飯店旁的隆比尼公園散步，呼吸新鮮空氣，運氣好還能看到著名的野生大澤巨蜥！",
          links: [
            { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=Lumphini+Park" }
          ]
        },
        {
          id: "d1-4",
          time: "12:00",
          title: "午餐與下午茶：Baan Suan Sathon ＆ Park Sathorn",
          type: "coffee",
          region: "曼谷",
          desc: "森林系童話餐廳與網美咖啡廳，享用美味泰式料理及英式下午茶，置身於森林瀑布、古堡仙境中拍美照！",
          links: [
            { text: "餐廳地圖", url: "https://www.google.com/maps/search/?api=1&query=Baan+Suan+Sathon" },
            { text: "咖啡廳地圖", url: "https://www.google.com/maps/search/?api=1&query=Park+Sathorn+Restaurant" }
          ]
        },
        {
          id: "d1-5",
          time: "14:30",
          title: "商場逛街：One Bangkok (曼谷一號) ＆ Central Embassy",
          type: "shopping",
          region: "曼谷",
          desc: "走訪曼谷全新奢華造鎮地標 One Bangkok 及頂級貴婦百貨 Central Embassy 逛街採購。",
          links: [
            { text: "One Bangkok 地圖", url: "https://www.google.com/maps/search/?api=1&query=One+Bangkok" },
            { text: "Central Embassy 地圖", url: "https://www.google.com/maps/search/?api=1&query=Central+Embassy" }
          ]
        },
        {
          id: "d1-6",
          time: "18:30",
          title: "晚餐：Central Embassy 百貨內享用",
          type: "food",
          region: "曼谷",
          desc: "在貴婦百貨美食街或高級餐廳享用精緻泰式晚餐。飯後搭 Grab 回 Lumpini 飯店辦理入住與休息。",
          links: [
            { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=Central+Embassy" }
          ]
        }
      ]
    },
    {
      day: 2,
      date: "7/15 (三)",
      title: "研討會商務日 ＆ 全家四面佛祈福",
      summary: "主辦人參加全天研討會，家人前往市區熱門商圈購物，傍晚齊聚四面佛祈福並共進晚餐。",
      region: "曼谷",
      hotelName: "曼谷格蘭德中心點隆比尼飯店",
      hotelMapQuery: "Grande+Centre+Point+Lumpini",
      activities: [
        {
          id: "d2-1",
          time: "08:30",
          title: "SDConference 研討會 (麗笙套房飯店)",
          type: "info",
          region: "曼谷",
          desc: "主辦人前往研討會場「曼谷素坤逸麗笙套房飯店」參與全天學術商務研討會。",
          links: [
            { text: "會場地圖", url: "https://www.google.com/maps/search/?api=1&query=Radisson+Suites+Bangkok+Sukhumvit" },
            { text: "會場官網", url: "https://www.radissonhotels.com/en-us/hotels/radisson-bangkok-sukhumvit" }
          ]
        },
        {
          id: "d2-2",
          time: "10:00",
          title: "家人行程：Siam Paragon ＆ Central World 購物",
          type: "shopping",
          region: "曼谷",
          desc: "家人搭捷運至 Siam 站，利用天橋系統輕鬆逛 Siam Paragon 百貨與 Central World，避開炎熱天氣。",
          links: [
            { text: "Siam Paragon 地圖", url: "https://www.google.com/maps/search/?api=1&query=Siam+Paragon" },
            { text: "Central World 地圖", url: "https://www.google.com/maps/search/?api=1&query=Central+World" }
          ]
        },
        {
          id: "d2-3",
          time: "17:30",
          title: "全家四面佛 (Erawan Shrine) 齊聚祈福",
          type: "camera",
          region: "曼谷",
          desc: "研討會結束後，全家於曼谷市中心最具靈性的四面佛會合祈福，祈求闔家平安順遂。",
          links: [
            { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=Erawan+Shrine" }
          ]
        },
        {
          id: "d2-4",
          time: "18:30",
          title: "晚餐：Central World 享用美食",
          type: "food",
          region: "曼谷",
          desc: "於 Central World 百貨內挑選知名泰式餐廳（如 Nara Thai Cuisine）享用豐盛晚餐，隨後返回 Lumpini 飯店休整。",
          links: [
            { text: "餐廳地圖", url: "https://www.google.com/maps/search/?api=1&query=Central+World" }
          ]
        }
      ]
    },
    {
      day: 3,
      date: "7/16 (四)",
      title: "包車前往羅勇 → 鮮果狂歡 → 森林瀑布 → 入住芭達雅",
      summary: "包車一路南下，造訪水果王國羅勇，下午在祕境餐廳下午茶，傍晚入住質感別墅，享海景海鮮大餐。",
      region: "羅勇",
      hotelName: "芭提雅寰庭帕塔納克酒店 (Cross Pattaya)",
      hotelMapQuery: "Cross+Pattaya+Oceanphere",
      activities: [
        {
          id: "d3-1",
          time: "08:30",
          title: "辦理退房，包車專車前往羅勇府",
          type: "transport",
          region: "曼谷-羅勇",
          desc: "飯店大廳會合，專車接駁直奔羅勇（車程約 2.5 小時），免去大眾運輸奔波，舒適便利。",
          links: [
            { text: "曼谷至羅勇路線", url: "https://www.google.com/maps/dir/Grande+Centre+Point+Lumpini/Suphattra+Land/" }
          ]
        },
        {
          id: "d3-2",
          time: "11:00",
          title: "指定景點：素芭他觀光果園 (Suphattra Land)",
          type: "camera",
          region: "羅勇",
          desc: "搭乘果園電瓶導覽車，大啖現採新鮮金枕頭榴槤、山竹、紅毛丹等熱帶水果吃到飽！",
          links: [
            { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=Suphattra+Land" },
            { text: "景點介紹", url: "https://lordcat.net/archives/927" }
          ]
        },
        {
          id: "d3-3",
          time: "13:45",
          title: "指定景點：ร้านปาฎี (Pa Dee) 歐式花園咖啡館",
          type: "coffee",
          region: "羅勇",
          desc: "被綠意與鮮花簇擁的南歐鄉村風莊園，品嚐精緻的蜂蜜千層蛋糕與花草茶，隨處都是網美拍照熱點。",
          links: [
            { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=Pa+Dee+Rayong" },
            { text: "果園至咖啡廳路線", url: "https://www.google.com/maps/dir/Suphattra+Land/Pa+Dee+Rayong/" }
          ]
        },
        {
          id: "d3-4",
          time: "15:30",
          title: "指定景點：Tamnanpar Restaurant 森林瀑布餐廳",
          type: "food",
          region: "羅勇",
          desc: "置身於真正的熱帶雨林瀑布祕境中，聆聽流水與鳥鳴，來一份熱帶泰式特色點心或提早享用森林晚宴。",
          links: [
            { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=Tamnanpar+Forest+Restaurant" },
            { text: "咖啡廳至餐廳路線", url: "https://www.google.com/maps/dir/Pa+Dee+Rayong/Tamnanpar+Forest+Restaurant/" }
          ]
        },
        {
          id: "d3-5",
          time: "17:00",
          title: "專車前往芭達雅度假村 check-in",
          type: "hotel",
          region: "芭達雅",
          desc: "抵達奢華私人泳池別墅度假飯店「芭提雅寰庭帕塔納克酒店 (Cross Pattaya Oceanphere)」，享受放鬆時光。",
          links: [
            { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=Cross+Pattaya+Oceanphere" },
            { text: "飯店訂房", url: "https://tw.hotels.com/ho32585204/" },
            { text: "餐廳至度假村路線", url: "https://www.google.com/maps/dir/Tamnanpar+Forest+Restaurant/Cross+Pattaya+Oceanphere/" }
          ]
        },
        {
          id: "d3-6",
          time: "19:30",
          title: "晚餐：The Oxygen Pattaya 海景餐廳",
          type: "food",
          region: "芭達雅",
          desc: "芭達雅超美超人氣海景景觀餐廳！餐點與特調精美美味，在超寬敞的戶外海風草坪座享用晚餐，氣氛滿分。",
          links: [
            { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=The+Oxygen+Pattaya" }
          ]
        }
      ]
    },
    {
      day: 4,
      date: "7/17 (五)",
      title: "四方水上市場 → House of Benedict → 羅摩耶那水樂園狂歡 → 懸崖海景日落 → 週末夜市",
      summary: "上午體驗水上文化與室內頂級網美照，下午在水樂園刺激消暑，傍晚在懸崖餐廳賞落日，深夜探訪週末夜市。",
      region: "芭達雅",
      hotelName: "芭提雅寰庭帕塔納克酒店 (Cross Pattaya)",
      hotelMapQuery: "Cross+Pattaya+Oceanphere",
      activities: [
        {
          id: "d4-1",
          time: "09:30",
          title: "體驗：四方水上市場 (Pattaya Floating Market)",
          type: "camera",
          region: "芭達雅",
          desc: "純人工打造的傳統木雕風格水上市場，感受水鄉文化、乘手搖船，人潮適中，極具在地風情。",
          links: [
            { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=Pattaya+Floating+Market" }
          ]
        },
        {
          id: "d4-2",
          time: "11:45",
          title: "景點：House of Benedict 網美空間",
          type: "coffee",
          region: "芭達雅",
          desc: "極富想像力的室內複合式奇幻空間，融合了藝術造景、特色酒吧與咖啡廳，拍照張張是大片！",
          links: [
            { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=House+of+Benedict+Pattaya" }
          ]
        },
        {
          id: "d4-3",
          time: "13:30",
          title: "必去行程：羅摩耶那水上樂園 (Ramayana Water Park) 狂歡",
          type: "camera",
          region: "芭達雅",
          desc: "泰國最大的水上樂園！水源天然，享有 21 種世界級滑水道、巨型衝浪池和互動式水上城堡，全家消暑首選！",
          links: [
            { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=Ramayana+Water+Park" },
            { text: "門票預訂", url: "https://www.klook.com/zh-TW/activity/1560-ramayana-water-park-pattaya/" }
          ]
        },
        {
          id: "d4-4",
          time: "17:30",
          title: "晚餐：Kliff Beach Club 懸崖餐廳 ＆ The Lunar Beach House",
          type: "food",
          region: "芭達雅",
          desc: "指定必去！在懸崖峭壁之上，遠眺暹羅灣金色夕陽落日，享用精緻下午茶、安格斯牛肉及無敵海景。（隔壁 The Lunar Beach House 亦為絕美海景備案）",
          links: [
            { text: "Kliff 地圖", url: "https://www.google.com/maps/search/?api=1&query=Kliff+Beach+Club+Pattaya" },
            { text: "Lunar 地圖", url: "https://www.google.com/maps/search/?api=1&query=The+Lunar+Beach+House+Pattaya" }
          ]
        },
        {
          id: "d4-5",
          time: "20:00",
          title: "探訪：Thepprasit Night Market 週末夜市",
          type: "shopping",
          region: "芭達雅",
          desc: "週五至週日限定營業的芭達雅超人氣在地夜市！在帳篷下品嚐地道泰式街頭小吃、水果沙拉、椰子冰淇淋。",
          links: [
            { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=Thepprasit+Night+Market" }
          ]
        }
      ]
    },
    {
      day: 5,
      date: "7/18 (六)",
      title: "返回曼谷 → Terminal 21 奶茶美食饗宴 → 水門市場 → SPA按摩 ＆ SW1 深夜食堂",
      summary: "中午回曼谷入住 Termianl 21 飯店，喝經典泰奶、大口吃平價美食，下午逛老街市集，晚上享受按摩與深夜夜市。",
      region: "曼谷",
      hotelName: "21航廈格蘭德中心點酒店 (Terminal 21)",
      hotelMapQuery: "Grande+Centre+Point+Hotel+Terminal+21",
      activities: [
        {
          id: "d5-1",
          time: "10:00",
          title: "退房並包車返回曼谷 Asok 市區",
          type: "transport",
          region: "芭達雅-曼谷",
          desc: "退房後乘專屬包車返回曼谷飯店，避開假日正午塞車車潮。",
          links: [
            { text: "跨城路線", url: "https://www.google.com/maps/dir/Cross+Pattaya+Oceanphere/Grande+Centre+Point+Hotel+Terminal+21/" }
          ]
        },
        {
          id: "d5-2",
          time: "12:30",
          title: "辦理入住、手標牌泰奶 ＆ Pier 21 午餐",
          type: "hotel",
          region: "曼谷",
          desc: "抵達 Grande Centre Point Terminal 21 寄存行李。先到 5 樓 Pier 21 享用平價小吃，並至 LG 樓層點一杯必喝的「手標牌 ChaTraMue 泰奶」！",
          links: [
            { text: "飯店地圖", url: "https://www.google.com/maps/search/?api=1&query=Grande+Centre+Point+Hotel+Terminal+21" },
            { text: "手標奶茶介紹", url: "https://www.chatramue.com.cn/" }
          ]
        },
        {
          id: "d5-3",
          time: "14:30",
          title: "逛街：水門市場 (Pratunam Market) 老街血拼",
          type: "shopping",
          region: "曼谷",
          desc: "搭 BTS 至 Chit Lom 站步行前往水門老街及 Platinum 時裝百貨，體驗曼谷最大服飾批發市場的樂趣。",
          links: [
            { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=The+Platinum+Fashion+Mall" }
          ]
        },
        {
          id: "d5-4",
          time: "18:30",
          title: "晚餐：飯店周邊 ＆ 舒壓腳底按摩",
          type: "food",
          region: "曼谷",
          desc: "回到 Asok 站，在周邊餐廳（如 Savoey 上味泰）享用海鮮大餐，隨後找家優質 SPA 做腳底舒壓按摩。",
          links: [
            { text: "Savoey 地圖", url: "https://www.google.com/maps/search/?api=1&query=Savoey+Seafood+CO.+Terminal21+Asok" }
          ]
        },
        {
          id: "d5-5",
          time: "21:00",
          title: "宵夜與逛街：SW1 Market 夜市 (ASOK站)",
          type: "shopping",
          region: "曼谷",
          desc: "Terminal 21 旁邊新興的深夜食堂美食夜市！提供各種泰式小吃、烤串、生活雜貨及特色伴手禮，氛圍熱絡。",
          links: [
            { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=SW1+Market+Bangkok" }
          ]
        }
      ]
    },
    {
      day: 6,
      date: "7/19 (日)",
      title: "鐵道市集火車秀 → 傳統水上市場乘船 → 伴手禮大採購",
      summary: "包車前往曼谷近郊，觀看火車擦身而過的奇景與傳統水上划船交易，下午回市區進行最後的伴手禮瘋狂採購。",
      region: "曼谷",
      hotelName: "21航廈格蘭德中心點酒店 (Terminal 21)",
      hotelMapQuery: "Grande+Centre+Point+Hotel+Terminal+21",
      activities: [
        {
          id: "d6-1",
          time: "08:00",
          title: "出發：美功鐵道市場 (Maeklong Railway Market)",
          type: "transport",
          region: "曼谷近郊",
          desc: "專車前往美功，親眼見證火車緩緩穿過狹窄菜市場、鐵路攤販瞬間收攤的世紀奇景！",
          links: [
            { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=Maeklong+Railway+Market" }
          ]
        },
        {
          id: "d6-2",
          time: "11:00",
          title: "體驗：丹嫩沙多水上市場 (Damnoen Saduak)",
          type: "camera",
          region: "曼谷近郊",
          desc: "搭乘傳統手搖木船，穿梭於繁忙的水上水道，向河道商販購買泰式椰絲餅、水上米粉湯與熱帶水果。",
          links: [
            { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=Damnoen+Saduak+Floating+Market" }
          ]
        },
        {
          id: "d6-3",
          time: "16:00",
          title: "採購：Big C Supercenter (Rajdamri店) 伴手禮",
          type: "shopping",
          region: "曼谷",
          desc: "曼谷最大最好買的 Big C 超市！狂掃泰國必買的零食、藥妝、海苔、大哥豆、皇家蜂蜜，買滿一箱直接打包裝箱。",
          links: [
            { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=Big+C+Supercenter+Ratchadamri" }
          ]
        },
        {
          id: "d6-4",
          time: "19:00",
          title: "晚餐：Terminal 21 內慶功宴",
          type: "food",
          region: "曼谷",
          desc: "採購完畢返回 Terminal 21 百貨，挑選一家心儀的餐廳享用豐盛的泰國之旅慶功宴，隨後休整行李。",
          links: [
            { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=Terminal+21+Asok" }
          ]
        }
      ]
    },
    {
      day: 7,
      date: "7/20 (一)",
      title: "頂級泰式 SPA → 昭披耶河畔 ICONSIAM 慢活 → 平安返台",
      summary: "最後一天上午做專業 SPA 按摩，下午造訪河畔地標 ICONSIAM 吃遍泰國特色美食，傍晚搭專車前往機場。",
      region: "曼谷",
      hotelName: "蘇凡納布機場",
      hotelMapQuery: "Suvarnabhumi+Airport",
      activities: [
        {
          id: "d7-1",
          time: "09:30",
          title: "舒壓：Let's Relax SPA (Terminal 21店)",
          type: "hotel",
          region: "曼谷",
          desc: "安排精緻的泰式古法草藥球按摩或精油 SPA，徹底釋放這幾天下來的肌肉酸痛與疲憊。",
          links: [
            { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=Let%27s+Relax+Spa+Terminal+21" }
          ]
        },
        {
          id: "d7-2",
          time: "12:00",
          title: "退房寄存行李，乘 BTS 轉接駁船至 ICONSIAM",
          type: "transport",
          region: "曼谷",
          desc: "辦理退房並寄放行李，搭捷運至 Saphan Taksin 站，再搭乘寬敞舒適的免費河畔接駁船前往 ICONSIAM。",
          links: [
            { text: "轉乘指引", url: "https://www.google.com/maps/dir/Grande+Centre+Point+Hotel+Terminal+21/Saphan+Taksin+BTS+Station/" }
          ]
        },
        {
          id: "d7-3",
          time: "12:30",
          title: "逛街：ICONSIAM (暹羅天地) 百貨",
          type: "shopping",
          region: "曼谷",
          desc: "曼谷天花板等級的河畔極致奢華百貨！一樓室內水上市場 (SookSiam) 匯聚泰國 77 府小吃與手工藝，是出發機場前的絕佳停靠站。",
          links: [
            { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=ICONSIAM" }
          ]
        },
        {
          id: "d7-4",
          time: "16:00",
          title: "返回 Terminal 21 提領行李，搭車前往機場",
          type: "transport",
          region: "曼谷",
          desc: "搭船與地鐵返回飯店領取行李。搭乘預約的 SUV 送機專車，直奔蘇凡納布機場 (BKK)，避開週一傍晚大塞車。",
          links: [
            { text: "機場路線", url: "https://www.google.com/maps/dir/Grande+Centre+Point+Hotel+Terminal+21/Suvarnabhumi+Airport" }
          ]
        },
        {
          id: "d7-5",
          time: "19:00",
          title: "抵達 蘇萬那普機場 (BKK) 報到返台",
          type: "transport",
          region: "曼谷",
          desc: "最晚於起飛前 3 小時抵達，辦理登機與行李寄託。隨後搭機於 23:59 前平安抵達桃園機場，結束美好的泰國避暑商務家庭之旅！",
          links: [
            { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=Suvarnabhumi+Airport" }
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
    infoUrl: 'https://letsplay.tw/terminal-21/'
  },
  {
    key: 'iconsiam',
    keywords: ['ICONSIAM', '暹羅天地'],
    name: 'ICONSIAM',
    style: { left: '34%', top: '15%', width: '20%', height: '18%' },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=ICONSIAM',
    infoUrl: 'https://www.bring-you.info/zh-tw/iconsiam'
  },
  {
    key: 'floating_market',
    keywords: ['水上市場', '丹能莎朵', '丹嫩沙多'],
    name: '丹嫩沙多水上市場',
    style: { left: '5%', top: '28%', width: '25%', height: '18%' },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Damnoen+Saduak+Floating+Market',
    infoUrl: 'https://www.bring-you.info/zh-tw/damnoen-saduak-floating-market'
  },
  {
    key: 'railway_market',
    keywords: ['鐵道市場', '美功'],
    name: '美功鐵道市場',
    style: { left: '5%', top: '48%', width: '25%', height: '18%' },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Maeklong+Railway+Market',
    infoUrl: 'https://www.bring-you.info/zh-tw/maeklong-railway-market'
  },
  {
    key: 'cross_pattaya',
    keywords: ['Cross Pattaya', 'CrossPattaya', '芭提雅寰庭'],
    name: 'Cross Pattaya',
    style: { left: '42%', top: '38%', width: '18%', height: '18%' },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Cross+Pattaya+Oceanphere',
    infoUrl: 'https://www.crosspattayaoceanphere.com/'
  },
  {
    key: 'kliff',
    keywords: ['Kliff'],
    name: 'Kliff 懸崖餐廳',
    style: { left: '60%', top: '45%', width: '15%', height: '16%' },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Kliff+Beach+Club+Pattaya',
    infoUrl: 'https://www.viviyu.com/blog/post/kliff-beach-club'
  },
  {
    key: 'suphattra',
    keywords: ['素芭他', '水果園', 'Suphattra'],
    name: '素芭他水果園',
    style: { left: '54%', top: '70%', width: '20%', height: '16%' },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Suphattra+Land',
    infoUrl: 'https://lordcat.net/archives/927'
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
    infoUrl: 'https://sunnylife.tw/one-bangkok/'
  },
  {
    key: 'safari_world',
    keywords: ['Safari World', '野生動物園', '賽福瑞'],
    name: 'Safari World 賽福瑞動物園',
    style: { left: '20%', top: '2%', width: '15%', height: '10%' },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Safari+World+Bangkok',
    infoUrl: 'https://www.bring-you.info/zh-tw/safari-world-bangkok'
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
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Savoey+Seafood+CO.+Terminal21+Asok',
    infoUrl: 'https://tsnio.com/savoey/'
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
    infoUrl: 'https://www.bring-you.info/zh-tw/chao-phraya-princess-cruise'
  },
  {
    key: 'aquaverse',
    keywords: ['Aquaverse', '樂園', '水上樂園'],
    name: '哥倫比亞影業主題樂園 Aquaverse',
    style: { left: '50%', top: '53%', width: '12%', height: '8%' },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Columbia+Pictures+Aquaverse',
    infoUrl: 'https://aikolife.com/pattaya-aquaverse/'
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
    keywords: ["Let's Relax", '按摩', 'SPA'],
    name: "Let's Relax 泰式按摩",
    style: { left: '2%', top: '10%', width: '10%', height: '8%' },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Let%27s+Relax+Spa+Terminal+21',
    infoUrl: 'https://www.bigfang.tw/blog/post/31969271'
  },
  {
    key: 'airport',
    keywords: ['機場', 'Airport', 'Suvarnabhumi', '蘇凡納布'],
    name: '蘇凡納布機場',
    style: { left: '38%', top: '2%', width: '12%', height: '8%' },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Suvarnabhumi+Airport',
    infoUrl: 'https://www.klook.com/zh-TW/blog/bangkok-airport-transfers/'
  },
  {
    key: 'ramayana',
    keywords: ['羅摩耶那', 'Ramayana'],
    name: '羅摩耶那水上樂園',
    style: { left: '62%', top: '60%', width: '16%', height: '10%' },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Ramayana+Water+Park',
    infoUrl: 'https://www.klook.com/zh-TW/activity/1560-ramayana-water-park-pattaya/'
  },
  {
    key: 'house_of_benedict',
    keywords: ['House of Benedict'],
    name: 'House of Benedict',
    style: { left: '48%', top: '46%', width: '14%', height: '10%' },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=House+of+Benedict+Pattaya',
    infoUrl: 'https://www.instagram.com/houseofbenedict/'
  },
  {
    key: 'lunar_beach',
    keywords: ['The Lunar Beach House', 'Lunar Beach'],
    name: 'The Lunar Beach House',
    style: { left: '68%', top: '38%', width: '14%', height: '10%' },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=The+Lunar+Beach+House+Pattaya',
    infoUrl: 'https://www.facebook.com/TheLunarBeachHousePattaya/'
  },
  {
    key: 'four_regions',
    keywords: ['四方水上市場', '四方水上'],
    name: '四方水上市場',
    style: { left: '38%', top: '48%', width: '14%', height: '10%' },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Pattaya+Floating+Market',
    infoUrl: 'https://www.pattayafloatingmarket.co/'
  },
  {
    key: 'thepprasit',
    keywords: ['Thepprasit', '夜市'],
    name: 'Thepprasit 週末夜市',
    style: { left: '46%', top: '30%', width: '14%', height: '10%' },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Thepprasit+Night+Market',
    infoUrl: 'https://www.pattayaunlimited.com/thepprasit-road-night-market/'
  },
  {
    key: 'sw1_market',
    keywords: ['SW1 Market', 'SW1'],
    name: 'SW1 Market 夜市',
    style: { left: '15%', top: '15%', width: '12%', height: '8%' },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=SW1+Market+Bangkok',
    infoUrl: 'https://www.google.com/maps/search/?api=1&query=SW1+Market+Bangkok'
  },
  {
    key: 'oxygen_pattaya',
    keywords: ['Oxygen Pattaya', 'The Oxygen'],
    name: 'The Oxygen Pattaya',
    style: { left: '58%', top: '32%', width: '14%', height: '10%' },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=The+Oxygen+Pattaya',
    infoUrl: 'https://www.facebook.com/TheOxygenPattaya/'
  },
  {
    key: 'chatramue',
    keywords: ['手標牌', 'ChaTraMue'],
    name: '手標泰式奶茶 (Terminal 21)',
    style: { left: '4%', top: '18%', width: '12%', height: '8%' },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=ChaTraMue+Terminal+21+Asok',
    infoUrl: 'https://www.chatramue.com.cn/'
  },
  {
    key: 'park_sathorn',
    keywords: ['Park Sathorn', 'Baan Suan Sathon'],
    name: 'Park Sathorn & Baan Suan Sathon',
    style: { left: '26%', top: '18%', width: '14%', height: '10%' },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Park+Sathorn+Restaurant+Bangkok',
    infoUrl: 'https://www.facebook.com/parksathorn/'
  }
];

const HOTEL_BOOKING_URLS = {
  "Centre Point Hotel Terminal 21": "https://tw.hotels.com/ho403204/",
  "Cross Pattaya Oceanphere": "https://tw.hotels.com/ho32585204/",
  "Grande Centre Point Hotel Terminal 21": "https://tw.hotels.com/ho403204/",
  "曼谷格蘭德中心點隆比尼飯店": "https://tw.hotels.com/ho1258679072/",
  "芭提雅寰庭帕塔納克酒店 (Cross Pattaya)": "https://tw.hotels.com/ho32585204/",
  "21航廈格蘭德中心點酒店 (Terminal 21)": "https://tw.hotels.com/ho403204/"
};`;

// 2. Define the new ROUTE_CONFIGS block
const newRouteConfigs = `  const ROUTE_CONFIGS = [
    {
      key: 'bangkok-route',
      name: 'Day 1-2 曼谷路線',
      style: { left: '20%', top: '23%', width: '12%', height: '10%' },
      navUrl: 'https://www.google.com/maps/dir/Grande+Centre+Point+Lumpini/One+Bangkok/Baan+Suan+Sathon/Central+Embassy/Siam+Paragon',
      infoUrl: 'https://www.onebangkok.com/',
      show: tripSchedule.days.some(d => d.region === '曼谷' && d.activities.length > 0)
    },
    {
      key: 'rayong-route',
      name: 'Day 3-4 羅勇路線',
      style: { left: '30%', top: '42%', width: '10%', height: '22%' },
      navUrl: 'https://www.google.com/maps/dir/Grande+Centre+Point+Lumpini/Suphattra+Land/Pa+Dee+Rayong/Tamnanpar+Forest+Restaurant/Cross+Pattaya+Oceanphere',
      infoUrl: 'https://www.crosshotelsandresorts.com/cross-pattaya-oceanphere',
      show: tripSchedule.days.some(d => (d.region === '羅勇' || d.region === '芭達雅') && d.activities.length > 0)
    },
    {
      key: 'return-route',
      name: 'Day 5-7 返程路線',
      style: { left: '48%', top: '56%', width: '8%', height: '15%' },
      navUrl: 'https://www.google.com/maps/dir/Cross+Pattaya+Oceanphere/Grande+Centre+Point+Terminal+21/Pratunam+Market/Maeklong+Railway+Market/Damnoen+Saduak+Floating+Market/Big+C+Supercenter+Ratchadamri/ICONSIAM',
      infoUrl: 'https://www.klook.com/zh-TW/activity/365-safari-world-bangkok/',
      show: tripSchedule.days.some(d => [5, 6, 7].includes(d.day) && d.activities.length > 0)
    }
  ];`;

function run() {
  console.log("Loading App.jsx...");
  let appJsx = fs.readFileSync(appJsxPath, 'utf8');

  // Locate the block from "const initialTripData = {" to the end of HOTEL_BOOKING_URLS
  const initialTripDataStartStr = "const initialTripData = {";
  const startIdx = appJsx.indexOf(initialTripDataStartStr);
  if (startIdx === -1) {
    console.error("Could not find const initialTripData = { in App.jsx");
    process.exit(1);
  }

  // Find the end of HOTEL_BOOKING_URLS block
  const hotelBookingUrlsEndStr = "};";
  const searchFromIdx = appJsx.indexOf("const HOTEL_BOOKING_URLS =", startIdx);
  if (searchFromIdx === -1) {
    console.error("Could not find const HOTEL_BOOKING_URLS in App.jsx");
    process.exit(1);
  }

  const endIdx = appJsx.indexOf(hotelBookingUrlsEndStr, searchFromIdx);
  if (endIdx === -1) {
    console.error("Could not find the end of HOTEL_BOOKING_URLS block in App.jsx");
    process.exit(1);
  }

  const replacementEnd = endIdx + hotelBookingUrlsEndStr.length;

  console.log("Replacing initialTripData block...");
  appJsx = appJsx.substring(0, startIdx) + newTripDataAndHotspots + appJsx.substring(replacementEnd);

  // Now replace ROUTE_CONFIGS block
  const routeConfigsStartStr = "const ROUTE_CONFIGS = [";
  const routeStartIdx = appJsx.indexOf(routeConfigsStartStr);
  if (routeStartIdx === -1) {
    console.error("Could not find const ROUTE_CONFIGS = [ in App.jsx");
    process.exit(1);
  }

  const routeEndIdx = appJsx.indexOf("];", routeStartIdx);
  if (routeEndIdx === -1) {
    console.error("Could not find the end of ROUTE_CONFIGS in App.jsx");
    process.exit(1);
  }

  const routeReplacementEnd = routeEndIdx + "];".length;

  console.log("Replacing ROUTE_CONFIGS block...");
  appJsx = appJsx.substring(0, routeStartIdx) + newRouteConfigs + appJsx.substring(routeReplacementEnd);

  console.log("Writing changes back to App.jsx...");
  fs.writeFileSync(appJsxPath, appJsx, 'utf8');
  console.log("App.jsx updated successfully!");

  // Create/Overwrite local_kv_db.json
  console.log("Creating local_kv_db.json database file...");
  // Evaluate the object to get pure JSON
  const initialTripDataObj = {
    title: "B&B泰國家庭旅遊",
    dates: "2026/07/14 - 2026/07/20",
    pax: "4人 (家庭旅遊)",
    requirements: [
      "7/15 需在 One Bangkok (SDConference) 附近",
      "住宿房型：兩間單人床 (Twin Room) x 2間",
      "必去：羅勇素芭他水果園、Pa Dee 咖啡、Kliff 餐廳、Cross Pattaya、羅摩耶那水上樂園",
      "飯店等級：3星級以上"
    ],
    days: [
      {
        day: 1,
        date: "7/14 (二)",
        title: "抵達曼谷、初探都會魅力",
        summary: "班機抵達曼谷，專車接送至市區飯店。下午探索全新地標 One Bangkok 與 Sathorn 森林秘境餐廳。",
        region: "曼谷",
        hotelName: "曼谷格蘭德中心點隆比尼飯店",
        hotelMapQuery: "Grande+Centre+Point+Lumpini",
        activities: [
          {
            id: "d1-1",
            time: "06:00",
            title: "抵達曼谷機場 (BKK)",
            type: "transport",
            region: "曼谷",
            desc: "搭乘預約的機場接送專車前往曼谷市區飯店寄放行李。辦理入境手續與行李提領。",
            links: [
              { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=Suvarnabhumi+Airport" },
              { text: "預訂接送", url: "https://www.klook.com/zh-TW/transport/airport-transfer/bangkok/" }
            ]
          },
          {
            id: "d1-2",
            time: "08:30",
            title: "抵達 曼谷格蘭德中心點隆比尼飯店 寄放行李",
            type: "hotel",
            region: "曼谷",
            desc: "位於地鐵 Lumphini 站旁，交通極其便利，可步行至 One Bangkok。寄放行李後開啟旅程。",
            links: [
              { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=Grande+Centre+Point+Lumpini" },
              { text: "飯店訂房", url: "https://tw.hotels.com/ho1258679072/" }
            ]
          },
          {
            id: "d1-3",
            time: "09:30",
            title: "隆比尼公園 (Lumphini Park) 散步",
            type: "camera",
            region: "曼谷",
            desc: "步行至飯店旁的隆比尼公園散步，呼吸新鮮空氣，運氣好還能看到著名的野生大澤巨蜥！",
            links: [
              { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=Lumphini+Park" }
            ]
          },
          {
            id: "d1-4",
            time: "12:00",
            title: "午餐與下午茶：Baan Suan Sathon ＆ Park Sathorn",
            type: "coffee",
            region: "曼谷",
            desc: "森林系童話餐廳與網美咖啡廳，享用美味泰式料理及英式下午茶，置身於森林瀑布、古堡仙境中拍美照！",
            links: [
              { text: "餐廳地圖", url: "https://www.google.com/maps/search/?api=1&query=Baan+Suan+Sathon" },
              { text: "咖啡廳地圖", url: "https://www.google.com/maps/search/?api=1&query=Park+Sathorn+Restaurant" }
            ]
          },
          {
            id: "d1-5",
            time: "14:30",
            title: "商場逛街：One Bangkok (曼谷一號) ＆ Central Embassy",
            type: "shopping",
            region: "曼谷",
            desc: "走訪曼谷全新奢華造鎮地標 One Bangkok 及頂級貴婦百貨 Central Embassy 逛街採購。",
            links: [
              { text: "One Bangkok 地圖", url: "https://www.google.com/maps/search/?api=1&query=One+Bangkok" },
              { text: "Central Embassy 地圖", url: "https://www.google.com/maps/search/?api=1&query=Central+Embassy" }
            ]
          },
          {
            id: "d1-6",
            time: "18:30",
            title: "晚餐：Central Embassy 百貨內享用",
            type: "food",
            region: "曼谷",
            desc: "在貴婦百貨美食街或高級餐廳享用精緻泰式晚餐。飯後搭 Grab 回 Lumpini 飯店辦理入住與休息。",
            links: [
              { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=Central+Embassy" }
            ]
          }
        ]
      },
      {
        day: 2,
        date: "7/15 (三)",
        title: "研討會商務日 ＆ 全家四面佛祈福",
        summary: "主辦人參加全天研討會，家人前往市區熱門商圈購物，傍晚齊聚四面佛祈福並共進晚餐。",
        region: "曼谷",
        hotelName: "曼谷格蘭德中心點隆比尼飯店",
        hotelMapQuery: "Grande+Centre+Point+Lumpini",
        activities: [
          {
            id: "d2-1",
            time: "08:30",
            title: "SDConference 研討會 (麗笙套房飯店)",
            type: "info",
            region: "曼谷",
            desc: "主辦人前往研討會場「曼谷素坤逸麗笙套房飯店」參與全天學術商務研討會。",
            links: [
              { text: "會場地圖", url: "https://www.google.com/maps/search/?api=1&query=Radisson+Suites+Bangkok+Sukhumvit" },
              { text: "會場官網", url: "https://www.radissonhotels.com/en-us/hotels/radisson-bangkok-sukhumvit" }
            ]
          },
          {
            id: "d2-2",
            time: "10:00",
            title: "家人行程：Siam Paragon ＆ Central World 購物",
            type: "shopping",
            region: "曼谷",
            desc: "家人搭捷運至 Siam 站，利用天橋系統輕鬆逛 Siam Paragon 百貨與 Central World，避開炎熱天氣。",
            links: [
              { text: "Siam Paragon 地圖", url: "https://www.google.com/maps/search/?api=1&query=Siam+Paragon" },
              { text: "Central World 地圖", url: "https://www.google.com/maps/search/?api=1&query=Central+World" }
            ]
          },
          {
            id: "d2-3",
            time: "17:30",
            title: "全家四面佛 (Erawan Shrine) 齊聚祈福",
            type: "camera",
            region: "曼谷",
            desc: "研討會結束後，全家於曼谷市中心最具靈性的四面佛會合祈福，祈求闔家平安順遂。",
            links: [
              { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=Erawan+Shrine" }
            ]
          },
          {
            id: "d2-4",
            time: "18:30",
            title: "晚餐：Central World 享用美食",
            type: "food",
            region: "曼谷",
            desc: "於 Central World 百貨內挑選知名泰式餐廳（如 Nara Thai Cuisine）享用豐盛晚餐，隨後返回 Lumpini 飯店休整。",
            links: [
              { text: "餐廳地圖", url: "https://www.google.com/maps/search/?api=1&query=Central+World" }
            ]
          }
        ]
      },
      {
        day: 3,
        date: "7/16 (四)",
        title: "包車前往羅勇 → 鮮果狂歡 → 森林瀑布 → 入住芭達雅",
        summary: "包車一路南下，造訪水果王國羅勇，下午在祕境餐廳下午茶，傍晚入住質感別墅，享海景海鮮大餐。",
        region: "羅勇",
        hotelName: "芭提雅寰庭帕塔納克酒店 (Cross Pattaya)",
        hotelMapQuery: "Cross+Pattaya+Oceanphere",
        activities: [
          {
            id: "d3-1",
            time: "08:30",
            title: "辦理退房，包車專車前往羅勇府",
            type: "transport",
            region: "曼谷-羅勇",
            desc: "飯店大廳會合，專車接駁直奔羅勇（車程約 2.5 小時），免去大眾運輸奔波，舒適便利。",
            links: [
              { text: "曼谷至羅勇路線", url: "https://www.google.com/maps/dir/Grande+Centre+Point+Lumpini/Suphattra+Land/" }
            ]
          },
          {
            id: "d3-2",
            time: "11:00",
            title: "指定景點：素芭他觀光果園 (Suphattra Land)",
            type: "camera",
            region: "羅勇",
            desc: "搭乘果園電瓶導覽車，大啖現採新鮮金枕頭榴槤、山竹、紅毛丹等熱帶水果吃到飽！",
            links: [
              { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=Suphattra+Land" },
              { text: "景點介紹", url: "https://lordcat.net/archives/927" }
            ]
          },
          {
            id: "d3-3",
            time: "13:45",
            title: "指定景點：ร้านปาฎี (Pa Dee) 歐式花園咖啡館",
            type: "coffee",
            region: "羅勇",
            desc: "被綠意與鮮花簇擁的南歐鄉村風莊園，品嚐精緻的蜂蜜千層蛋糕與花草茶，隨處都是網美拍照熱點。",
            links: [
              { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=Pa+Dee+Rayong" },
              { text: "果園至咖啡廳路線", url: "https://www.google.com/maps/dir/Suphattra+Land/Pa+Dee+Rayong/" }
            ]
          },
          {
            id: "d3-4",
            time: "15:30",
            title: "指定景點：Tamnanpar Restaurant 森林瀑布餐廳",
            type: "food",
            region: "羅勇",
            desc: "置身於真正的熱帶雨林瀑布祕境中，聆聽流水與鳥鳴，來一份熱帶泰式特色點心或提早享用森林晚宴。",
            links: [
              { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=Tamnanpar+Forest+Restaurant" },
              { text: "咖啡廳至餐廳路線", url: "https://www.google.com/maps/dir/Pa+Dee+Rayong/Tamnanpar+Forest+Restaurant/" }
            ]
          },
          {
            id: "d3-5",
            time: "17:00",
            title: "專車前往芭達雅度假村 check-in",
            type: "hotel",
            region: "芭達雅",
            desc: "抵達奢像私人泳池別墅度假飯店「芭提雅寰庭帕塔納克酒店 (Cross Pattaya Oceanphere)」，享受放鬆時光。",
            links: [
              { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=Cross+Pattaya+Oceanphere" },
              { text: "飯店訂房", url: "https://tw.hotels.com/ho32585204/" },
              { text: "餐廳至度假村路線", url: "https://www.google.com/maps/dir/Tamnanpar+Forest+Restaurant/Cross+Pattaya+Oceanphere/" }
            ]
          },
          {
            id: "d3-6",
            time: "19:30",
            title: "晚餐：The Oxygen Pattaya 海景餐廳",
            type: "food",
            region: "芭達雅",
            desc: "芭達雅超美超人氣海景景觀餐廳！餐點與特調精美美味，在超寬敞的戶外海風草坪座享用晚餐，氣氛滿分。",
            links: [
              { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=The+Oxygen+Pattaya" }
            ]
          }
        ]
      },
      {
        day: 4,
        date: "7/17 (五)",
        title: "四方水上市場 → House of Benedict → 羅摩耶那水樂園狂歡 → 懸崖海景日落 → 週末夜市",
        summary: "上午體驗水上文化與室內頂級網美照，下午在水樂園刺激消暑，傍晚在懸崖餐廳賞落日，深夜探訪週末夜市。",
        region: "芭達雅",
        hotelName: "芭提雅寰庭帕塔納克酒店 (Cross Pattaya)",
        hotelMapQuery: "Cross+Pattaya+Oceanphere",
        activities: [
          {
            id: "d4-1",
            time: "09:30",
            title: "體驗：四方水上市場 (Pattaya Floating Market)",
            type: "camera",
            region: "芭達雅",
            desc: "純人工打造的傳統木雕風格水上市場，感受水鄉文化、乘手搖船，人潮適中，極具在地風情。",
            links: [
              { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=Pattaya+Floating+Market" }
            ]
          },
          {
            id: "d4-2",
            time: "11:45",
            title: "景點：House of Benedict 網美空間",
            type: "coffee",
            region: "芭達雅",
            desc: "極富想像力的室內複合式奇幻空間，融合了藝術造景、特色酒吧與咖啡廳，拍照張張是大片！",
            links: [
              { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=House+of+Benedict+Pattaya" }
            ]
          },
          {
            id: "d4-3",
            time: "13:30",
            title: "必去行程：羅摩耶那水上樂園 (Ramayana Water Park) 狂歡",
            type: "camera",
            region: "芭達雅",
            desc: "泰國最大的水上樂園！水源天然，享有 21 種世界級滑水道、巨型衝浪池和互動式水上城堡，全家消暑首選！",
            links: [
              { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=Ramayana+Water+Park" },
              { text: "門票預訂", url: "https://www.klook.com/zh-TW/activity/1560-ramayana-water-park-pattaya/" }
            ]
          },
          {
            id: "d4-4",
            time: "17:30",
            title: "晚餐：Kliff Beach Club 懸崖餐廳 ＆ The Lunar Beach House",
            type: "food",
            region: "芭達雅",
            desc: "指定必去！在懸崖峭壁之上，遠眺暹羅灣金色夕陽落日，享用精緻下午茶、安格斯牛肉及無敵海景。（隔壁 The Lunar Beach House 亦為絕美海景備案）",
            links: [
              { text: "Kliff 地圖", url: "https://www.google.com/maps/search/?api=1&query=Kliff+Beach+Club+Pattaya" },
              { text: "Lunar 地圖", url: "https://www.google.com/maps/search/?api=1&query=The+Lunar+Beach+House+Pattaya" }
            ]
          },
          {
            id: "d4-5",
            time: "20:00",
            title: "探訪：Thepprasit Night Market 週末夜市",
            type: "shopping",
            region: "芭達雅",
            desc: "週五至週日限定營業的芭達雅超人氣在地夜市！在帳篷下品嚐地道泰式街頭小吃、水果沙拉、椰子冰淇淋。",
            links: [
              { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=Thepprasit+Night+Market" }
            ]
          }
        ]
      },
      {
        day: 5,
        date: "7/18 (六)",
        title: "返回曼谷 → Terminal 21 奶茶美食饗宴 → 水門市場 → SPA按摩 ＆ SW1 深夜食堂",
        summary: "中午回曼谷入住 Termianl 21 飯店，喝經典泰奶、大口吃平價美食，下午逛老街市集，晚上享受按摩與深夜夜市。",
        region: "曼谷",
        hotelName: "21航廈格蘭德中心點酒店 (Terminal 21)",
        hotelMapQuery: "Grande+Centre+Point+Hotel+Terminal+21",
        activities: [
          {
            id: "d5-1",
            time: "10:00",
            title: "退房並包車返回曼谷 Asok 市區",
            type: "transport",
            region: "芭達雅-曼谷",
            desc: "退房後乘專屬包車返回曼谷飯店，避開假日正午塞車車潮。",
            links: [
              { text: "跨城路線", url: "https://www.google.com/maps/dir/Cross+Pattaya+Oceanphere/Grande+Centre+Point+Hotel+Terminal+21/" }
            ]
          },
          {
            id: "d5-2",
            time: "12:30",
            title: "辦理入住、手標牌泰奶 ＆ Pier 21 午餐",
            type: "hotel",
            region: "曼谷",
            desc: "抵達 Grande Centre Point Terminal 21 寄存行李。先到 5 樓 Pier 21 享用平價小吃，並至 LG 樓層點一杯必喝的「手標牌 ChaTraMue 泰奶」！",
            links: [
              { text: "飯店地圖", url: "https://www.google.com/maps/search/?api=1&query=Grande+Centre+Point+Hotel+Terminal+21" },
              { text: "手標奶茶介紹", url: "https://www.chatramue.com.cn/" }
            ]
          },
          {
            id: "d5-3",
            time: "14:30",
            title: "逛街：水門市場 (Pratunam Market) 老街血拼",
            type: "shopping",
            region: "曼谷",
            desc: "搭 BTS 至 Chit Lom 站步行前往水門老街及 Platinum 時裝百貨，體驗曼谷最大服飾批發市場的樂趣。",
            links: [
              { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=The+Platinum+Fashion+Mall" }
            ]
          },
          {
            id: "d5-4",
            time: "18:30",
            title: "晚餐：飯店周邊 ＆ 舒壓腳底按摩",
            type: "food",
            region: "曼谷",
            desc: "回到 Asok 站，在周邊餐廳（如 Savoey 上味泰）享用海鮮大餐，隨後找家優質 SPA 做腳底舒壓按摩。",
            links: [
              { text: "Savoey 地圖", url: "https://www.google.com/maps/search/?api=1&query=Savoey+Seafood+CO.+Terminal21+Asok" }
            ]
          },
          {
            id: "d5-5",
            time: "21:00",
            title: "宵夜與逛街：SW1 Market 夜市 (ASOK站)",
            type: "shopping",
            region: "曼谷",
            desc: "Terminal 21 旁邊新興的深夜食堂美食夜市！提供各種泰式小吃、烤串、生活雜貨及特色伴手禮，氛圍熱絡。",
            links: [
              { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=SW1+Market+Bangkok" }
            ]
          }
        ]
      },
      {
        day: 6,
        date: "7/19 (日)",
        title: "鐵道市集火車秀 → 傳統水上市場乘船 → 伴手禮大採購",
        summary: "包車前往曼谷近郊，觀看火車擦身而過的奇景與傳統水上接收交易，下午回市區進行最後的伴手禮瘋狂採購。",
        region: "曼谷",
        hotelName: "21航廈格蘭德中心點酒店 (Terminal 21)",
        hotelMapQuery: "Grande+Centre+Point+Hotel+Terminal+21",
        activities: [
          {
            id: "d6-1",
            time: "08:00",
            title: "出發：美功鐵道市場 (Maeklong Railway Market)",
            type: "transport",
            region: "曼谷近郊",
            desc: "專車前往美功，親眼見證火車緩緩穿過狹窄菜市場、鐵路攤販瞬間收攤的世紀奇景！",
            links: [
              { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=Maeklong+Railway+Market" }
            ]
          },
          {
            id: "d6-2",
            time: "11:00",
            title: "體驗：丹嫩沙多水上市場 (Damnoen Saduak)",
            type: "camera",
            region: "曼谷近郊",
            desc: "搭乘傳統手搖木船，穿梭於繁忙的水上水道，向河道商販購買泰式椰絲餅、水上米粉湯與熱帶水果。",
            links: [
              { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=Damnoen+Saduak+Floating+Market" }
            ]
          },
          {
            id: "d6-3",
            time: "16:00",
            title: "採購：Big C Supercenter (Rajdamri店) 伴手禮",
            type: "shopping",
            region: "曼谷",
            desc: "曼谷最大最好買的 Big C 超市！狂掃泰國必買的零食、藥妝、海苔、大哥豆、皇家蜂蜜，買滿一箱直接打包裝箱。",
            links: [
              { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=Big+C+Supercenter+Ratchadamri" }
            ]
          },
          {
            id: "d6-4",
            time: "19:00",
            title: "晚餐：Terminal 21 內慶功宴",
            type: "food",
            region: "曼谷",
            desc: "採購完畢返回 Terminal 21 百貨，挑選一家心儀的餐廳享用豐盛的泰國之旅慶功宴，隨後休整行李。",
            links: [
              { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=Terminal+21+Asok" }
            ]
          }
        ]
      },
      {
        day: 7,
        date: "7/20 (一)",
        title: "頂級泰式 SPA → 昭披耶河畔 ICONSIAM 慢活 → 平安返台",
        summary: "最後一天上午做專業 SPA 按摩，下午造訪河畔地標 ICONSIAM 吃遍泰國特色美食，傍晚搭專車前往機場。",
        region: "曼谷",
        hotelName: "蘇凡納布機場",
        hotelMapQuery: "Suvarnabhumi+Airport",
        activities: [
          {
            id: "d7-1",
            time: "09:30",
            title: "舒壓：Let's Relax SPA (Terminal 21店)",
            type: "hotel",
            region: "曼谷",
            desc: "安排精緻的泰式古法草藥球按摩或精油 SPA，徹底釋放這幾天下來的肌肉酸痛與疲憊。",
            links: [
              { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=Let%27s+Relax+Spa+Terminal+21" }
            ]
          },
          {
            id: "d7-2",
            time: "12:00",
            title: "退房寄存行李，乘 BTS 轉接駁船至 ICONSIAM",
            type: "transport",
            region: "曼谷",
            desc: "辦理退房並寄放行李，搭捷運至 Saphan Taksin 站，再搭乘寬敞舒適的免費河畔接駁船前往 ICONSIAM。",
            links: [
              { text: "轉乘指引", url: "https://www.google.com/maps/dir/Grande+Centre+Point+Hotel+Terminal+21/Saphan+Taksin+BTS+Station/" }
            ]
          },
          {
            id: "d7-3",
            time: "12:30",
            title: "逛街：ICONSIAM (暹羅天地) 百貨",
            type: "shopping",
            region: "曼谷",
            desc: "曼谷天花板等級的河畔極致奢華百貨！一樓室內水上市場 (SookSiam) 匯聚泰國 77 府小吃與手工藝，是出發機場前的絕佳停靠站。",
            links: [
              { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=ICONSIAM" }
            ]
          },
          {
            id: "d7-4",
            time: "16:00",
            title: "返回 Terminal 21 提領行李，搭車前往機場",
            type: "transport",
            region: "曼谷",
            desc: "搭船與地鐵返回飯店領取行李。搭乘預約的 SUV 送機專車，直奔蘇凡納布機場 (BKK)，避開週一傍晚大塞車。",
            links: [
              { text: "機場路線", url: "https://www.google.com/maps/dir/Grande+Centre+Point+Hotel+Terminal+21/Suvarnabhumi+Airport" }
            ]
          },
          {
            id: "d7-5",
            time: "19:00",
            title: "抵達 蘇萬那普機場 (BKK) 報到返台",
            type: "transport",
            region: "曼谷",
            desc: "最晚於起飛前 3 小時抵達，辦理登機與行李寄託。隨後搭機於 23:59 前平安抵達桃園機場，結束美好的泰國避暑商務家庭之旅！",
            links: [
              { text: "景點地圖", url: "https://www.google.com/maps/search/?api=1&query=Suvarnabhumi+Airport" }
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

  fs.writeFileSync(dbPath, JSON.stringify(initialTripDataObj, null, 2), 'utf8');
  console.log("local_kv_db.json written successfully!");
}

run();
