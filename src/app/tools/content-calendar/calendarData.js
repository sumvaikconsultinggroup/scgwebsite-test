import { FaInstagram, FaTiktok, FaTwitter, FaLinkedinIn, FaFacebook, FaYoutube } from 'react-icons/fa';

export const platforms = [
  { id: 'instagram', name: 'Instagram', icon: FaInstagram, color: '#E1306C', bestTimes: ['9:00 AM', '12:00 PM', '5:00 PM', '7:00 PM'] },
  { id: 'tiktok', name: 'TikTok', icon: FaTiktok, color: '#00f2ea', bestTimes: ['7:00 AM', '10:00 AM', '2:00 PM', '7:00 PM'] },
  { id: 'twitter', name: 'Twitter/X', icon: FaTwitter, color: '#1DA1F2', bestTimes: ['8:00 AM', '12:00 PM', '3:00 PM', '6:00 PM'] },
  { id: 'linkedin', name: 'LinkedIn', icon: FaLinkedinIn, color: '#0077B5', bestTimes: ['7:30 AM', '10:00 AM', '12:00 PM', '5:00 PM'] },
  { id: 'facebook', name: 'Facebook', icon: FaFacebook, color: '#4267B2', bestTimes: ['9:00 AM', '1:00 PM', '4:00 PM', '8:00 PM'] },
  { id: 'youtube', name: 'YouTube', icon: FaYoutube, color: '#FF0000', bestTimes: ['12:00 PM', '3:00 PM', '5:00 PM', '9:00 PM'] },
];

export const contentTypes = [
  { id: 'post', label: 'Post', color: '#3b82f6' },
  { id: 'reel', label: 'Reel', color: '#ec4899' },
  { id: 'story', label: 'Story', color: '#f59e0b' },
  { id: 'carousel', label: 'Carousel', color: '#10b981' },
  { id: 'video', label: 'Video', color: '#ef4444' },
  { id: 'live', label: 'Live', color: '#8b5cf6' },
  { id: 'thread', label: 'Thread', color: '#06b6d4' },
  { id: 'poll', label: 'Poll', color: '#f97316' },
];

export const themes = [
  { id: 'product-launch', name: 'Product Launch', emoji: '🚀', description: 'Build hype and drive sales for new products' },
  { id: 'brand-awareness', name: 'Brand Awareness', emoji: '💡', description: 'Tell your story and build recognition' },
  { id: 'engagement', name: 'Engagement', emoji: '💬', description: 'Boost interaction and community building' },
  { id: 'educational', name: 'Educational', emoji: '📚', description: 'Share knowledge and build authority' },
  { id: 'seasonal', name: 'Seasonal/Trending', emoji: '🔥', description: 'Ride trends and seasonal moments' },
  { id: 'behind-scenes', name: 'Behind the Scenes', emoji: '🎬', description: 'Show authenticity and build trust' },
  { id: 'ugc', name: 'User Generated', emoji: '🤝', description: 'Leverage community content and testimonials' },
  { id: 'sales', name: 'Sales & Promos', emoji: '💰', description: 'Drive conversions with offers and urgency' },
];

export const contentTemplates = {
  'product-launch': [
    { type: 'reel', caption: 'Teaser: Something big is coming... 👀', hashtags: ['#ComingSoon', '#NewDrop', '#StayTuned', '#Teaser'], platforms: ['instagram', 'tiktok'] },
    { type: 'post', caption: 'Behind the scenes of our latest creation ✨', hashtags: ['#BTS', '#MakingOf', '#Process', '#Creation'], platforms: ['instagram', 'linkedin'] },
    { type: 'story', caption: 'Launch day countdown! 🔥 3 days to go', hashtags: ['#Countdown', '#LaunchDay', '#Excited'], platforms: ['instagram', 'facebook'] },
    { type: 'video', caption: 'Official product reveal & first look 🎬', hashtags: ['#Reveal', '#FirstLook', '#NewProduct', '#Unboxing'], platforms: ['youtube', 'tiktok'] },
    { type: 'carousel', caption: 'Top 5 features you need to know about 📋', hashtags: ['#Features', '#ProductHighlights', '#MustHave'], platforms: ['instagram', 'linkedin'] },
    { type: 'post', caption: 'Customer first reactions compilation 😍', hashtags: ['#Reactions', '#CustomerLove', '#Reviews'], platforms: ['twitter', 'facebook'] },
    { type: 'story', caption: 'Swipe up to be first to get yours! 🛒', hashtags: ['#ShopNow', '#LimitedEdition', '#FirstDibs'], platforms: ['instagram'] },
    { type: 'reel', caption: 'Unboxing our newest product — you won\'t believe this', hashtags: ['#Unboxing', '#NewArrival', '#Satisfying'], platforms: ['instagram', 'tiktok'] },
    { type: 'live', caption: 'LIVE: Launch party — join us for exclusive first look!', hashtags: ['#GoLive', '#LaunchParty', '#Exclusive'], platforms: ['instagram', 'youtube'] },
    { type: 'thread', caption: 'A thread on why we built this and what makes it different 🧵', hashtags: ['#Thread', '#WhyWeBuild', '#Innovation'], platforms: ['twitter', 'linkedin'] },
    { type: 'carousel', caption: 'From concept to reality — the journey of building this product', hashtags: ['#Journey', '#StartupLife', '#Building'], platforms: ['instagram', 'linkedin'] },
    { type: 'post', caption: 'Early bird pricing ends tonight — don\'t miss out ⏰', hashtags: ['#EarlyBird', '#Deal', '#LimitedTime'], platforms: ['twitter', 'facebook', 'instagram'] },
  ],
  'brand-awareness': [
    { type: 'post', caption: 'Our story: how it all began 📖', hashtags: ['#OurStory', '#BrandStory', '#Origins'], platforms: ['instagram', 'linkedin'] },
    { type: 'reel', caption: 'Meet the team behind the brand 👋', hashtags: ['#MeetTheTeam', '#TeamIntro', '#WeAre'], platforms: ['instagram', 'tiktok'] },
    { type: 'post', caption: 'Our core values in action — what we stand for', hashtags: ['#Values', '#Mission', '#Purpose'], platforms: ['linkedin', 'facebook'] },
    { type: 'story', caption: 'A day in the life at our office ☕', hashtags: ['#DayInTheLife', '#OfficeLife', '#TeamCulture'], platforms: ['instagram'] },
    { type: 'video', caption: 'Customer testimonial spotlight — hear from real users', hashtags: ['#Testimonial', '#CustomerStory', '#RealResults'], platforms: ['youtube', 'linkedin'] },
    { type: 'post', caption: 'What makes us different (and better) 💪', hashtags: ['#WhyUs', '#Unique', '#DifferentByDesign'], platforms: ['twitter', 'instagram'] },
    { type: 'carousel', caption: 'Our journey: Year 1 vs Now — see how far we\'ve come', hashtags: ['#Growth', '#Journey', '#Transformation'], platforms: ['instagram', 'linkedin'] },
    { type: 'reel', caption: 'POV: You just discovered your new favorite brand 😎', hashtags: ['#POV', '#NewFavorite', '#DiscoverUs'], platforms: ['instagram', 'tiktok'] },
    { type: 'post', caption: 'Fun facts about our brand that most people don\'t know 🤯', hashtags: ['#FunFacts', '#DidYouKnow', '#BrandTrivia'], platforms: ['twitter', 'facebook'] },
    { type: 'thread', caption: 'The story behind our logo and what each element means 🧵', hashtags: ['#LogoStory', '#Design', '#BrandIdentity'], platforms: ['twitter'] },
    { type: 'live', caption: 'LIVE Q&A with our founder — ask anything!', hashtags: ['#FounderChat', '#AskUs', '#LiveQA'], platforms: ['instagram', 'youtube'] },
    { type: 'video', caption: 'Our workspace tour — where ideas become reality', hashtags: ['#WorkspaceTour', '#OfficeTour', '#Creative'], platforms: ['youtube', 'tiktok'] },
  ],
  'engagement': [
    { type: 'story', caption: 'Poll: Which do you prefer? A or B? 🤔', hashtags: ['#Poll', '#Vote', '#YourChoice'], platforms: ['instagram', 'twitter'] },
    { type: 'reel', caption: 'Challenge accepted! Tag someone who needs to try this 🏆', hashtags: ['#Challenge', '#TagAFriend', '#TryThis'], platforms: ['instagram', 'tiktok'] },
    { type: 'post', caption: 'Caption this! 📸 Best caption wins a prize', hashtags: ['#CaptionThis', '#Contest', '#WinPrizes'], platforms: ['instagram', 'facebook'] },
    { type: 'post', caption: 'Q&A time! Drop your questions below 👇', hashtags: ['#QandA', '#AskMe', '#Questions'], platforms: ['twitter', 'instagram'] },
    { type: 'story', caption: 'This or That: Quick picks ⚡', hashtags: ['#ThisOrThat', '#Choose', '#QuickPicks'], platforms: ['instagram'] },
    { type: 'reel', caption: '🎉 GIVEAWAY! Rules: Follow + Like + Tag 2 friends', hashtags: ['#Giveaway', '#FreeStuff', '#Contest', '#Win'], platforms: ['instagram', 'tiktok'] },
    { type: 'poll', caption: 'What content do you want to see more of? Vote now!', hashtags: ['#Poll', '#YourVoice', '#Community'], platforms: ['twitter', 'instagram'] },
    { type: 'post', caption: 'Fill in the blank: My favorite thing about ____ is ____', hashtags: ['#FillInTheBlank', '#Interactive', '#Community'], platforms: ['facebook', 'instagram'] },
    { type: 'reel', caption: 'Duet this! Show us your version 🎬', hashtags: ['#Duet', '#YourVersion', '#Collab'], platforms: ['tiktok'] },
    { type: 'story', caption: 'Rate on a scale of 1-10: How much do you love this? ❤️', hashtags: ['#RateThis', '#Scale', '#Love'], platforms: ['instagram'] },
    { type: 'carousel', caption: 'Swipe to reveal the answer! Can you guess? 🧩', hashtags: ['#GuessTheAnswer', '#Swipe', '#Quiz'], platforms: ['instagram'] },
    { type: 'post', caption: 'Unpopular opinion: [hot take]. Do you agree? 🔥', hashtags: ['#UnpopularOpinion', '#HotTake', '#Debate'], platforms: ['twitter', 'linkedin'] },
  ],
  'educational': [
    { type: 'carousel', caption: 'Step-by-step guide: How to get started 📋', hashtags: ['#HowTo', '#Guide', '#Tutorial', '#LearnWith'], platforms: ['instagram', 'linkedin'] },
    { type: 'video', caption: 'Top 10 tips & tricks you wish you knew sooner', hashtags: ['#Tips', '#Tricks', '#ProTips', '#LifeHacks'], platforms: ['youtube', 'tiktok'] },
    { type: 'post', caption: 'Industry insight: What the latest data shows 📊', hashtags: ['#Industry', '#Data', '#Insights', '#Trends'], platforms: ['linkedin', 'twitter'] },
    { type: 'reel', caption: 'Myth busting: 3 common misconceptions debunked', hashtags: ['#MythBusted', '#Facts', '#Truth'], platforms: ['instagram', 'tiktok'] },
    { type: 'carousel', caption: 'Beginner\'s guide: Everything you need to know', hashtags: ['#BeginnersGuide', '#101', '#StartHere'], platforms: ['instagram', 'linkedin'] },
    { type: 'post', caption: 'Did you know? 5 surprising facts about our industry 🤯', hashtags: ['#DidYouKnow', '#Facts', '#Interesting'], platforms: ['twitter', 'facebook'] },
    { type: 'thread', caption: 'A deep dive into [topic]: Everything explained 🧵', hashtags: ['#DeepDive', '#Explained', '#Thread'], platforms: ['twitter'] },
    { type: 'video', caption: 'Watch me do it: Full tutorial from start to finish', hashtags: ['#Tutorial', '#WatchAndLearn', '#StepByStep'], platforms: ['youtube'] },
    { type: 'carousel', caption: 'Mistakes to avoid — learn from our experience', hashtags: ['#Mistakes', '#LessonsLearned', '#Avoid'], platforms: ['instagram', 'linkedin'] },
    { type: 'reel', caption: '60-second masterclass on [topic] ⏱️', hashtags: ['#Masterclass', '#QuickLearn', '#60Seconds'], platforms: ['instagram', 'tiktok'] },
    { type: 'post', caption: 'Book recommendation: The one book that changed our business 📕', hashtags: ['#BookRecommendation', '#MustRead', '#Learning'], platforms: ['linkedin', 'twitter'] },
    { type: 'live', caption: 'LIVE Workshop: Learn [skill] in 30 minutes', hashtags: ['#Workshop', '#LiveLearn', '#FreeClass'], platforms: ['instagram', 'youtube'] },
  ],
  'seasonal': [
    { type: 'post', caption: 'Happy holidays from our team! 🎄✨', hashtags: ['#HappyHolidays', '#Holidays', '#Celebration'], platforms: ['instagram', 'facebook'] },
    { type: 'reel', caption: 'Trending sound + our twist — had to jump on this 🎵', hashtags: ['#Trending', '#Viral', '#TrendAlert'], platforms: ['instagram', 'tiktok'] },
    { type: 'story', caption: 'Season\'s greetings + special offer inside 🎁', hashtags: ['#SpecialOffer', '#SeasonalDeal', '#Gift'], platforms: ['instagram'] },
    { type: 'post', caption: 'New year, new goals: What are yours? Share below! 🎯', hashtags: ['#NewYear', '#Goals', '#NewBeginnings'], platforms: ['linkedin', 'twitter'] },
    { type: 'reel', caption: 'Spring/Summer style inspiration from our collection 🌸', hashtags: ['#SpringVibes', '#StyleInspo', '#Seasonal'], platforms: ['instagram', 'tiktok'] },
    { type: 'post', caption: 'Our year in review: Biggest wins & lessons of 2025 🏆', hashtags: ['#YearInReview', '#Wrapped', '#Highlights'], platforms: ['instagram', 'facebook'] },
    { type: 'carousel', caption: 'Valentine\'s Day gift guide — sorted by budget ❤️', hashtags: ['#GiftGuide', '#ValentinesDay', '#GiftIdeas'], platforms: ['instagram'] },
    { type: 'reel', caption: 'Summer vibes only ☀️ Our team\'s summer playlist', hashtags: ['#Summer', '#Vibes', '#Playlist'], platforms: ['tiktok', 'instagram'] },
    { type: 'story', caption: 'Flash sale: 24 hours only for Black Friday 🖤', hashtags: ['#BlackFriday', '#FlashSale', '#Deals'], platforms: ['instagram', 'facebook'] },
    { type: 'post', caption: 'Monday motivation: Start your week strong 💪', hashtags: ['#MondayMotivation', '#Mindset', '#StartStrong'], platforms: ['linkedin', 'instagram'] },
    { type: 'reel', caption: 'Throwback to our best moments this year 📸', hashtags: ['#Throwback', '#BestMoments', '#Memories'], platforms: ['instagram', 'tiktok'] },
    { type: 'post', caption: 'Weekend plans? We\'ve got you covered 🎉', hashtags: ['#WeekendVibes', '#TGIF', '#WeekendPlans'], platforms: ['twitter', 'facebook'] },
  ],
  'behind-scenes': [
    { type: 'story', caption: 'Office tour: Where the magic happens ✨', hashtags: ['#OfficeTour', '#BTS', '#WorkLife'], platforms: ['instagram'] },
    { type: 'reel', caption: 'How we make our products: from raw materials to final 🏭', hashtags: ['#HowItsMade', '#Process', '#BehindTheScenes'], platforms: ['instagram', 'tiktok'] },
    { type: 'post', caption: 'Meet our newest team member! Welcome aboard 🎉', hashtags: ['#NewHire', '#Welcome', '#TeamGrowing'], platforms: ['linkedin', 'instagram'] },
    { type: 'video', caption: 'Full day behind the scenes at our studio 🎥', hashtags: ['#StudioLife', '#FullDay', '#BTS'], platforms: ['youtube'] },
    { type: 'story', caption: 'Sneak peek at what\'s coming next month 👀', hashtags: ['#SneakPeek', '#ComingSoon', '#Preview'], platforms: ['instagram'] },
    { type: 'reel', caption: 'Packing orders: The satisfying process 📦', hashtags: ['#PackingOrders', '#SmallBusiness', '#Satisfying'], platforms: ['tiktok', 'instagram'] },
    { type: 'post', caption: 'The messy middle: What building a brand really looks like 🫣', hashtags: ['#RealTalk', '#BrandBuilding', '#Honest'], platforms: ['linkedin', 'twitter'] },
    { type: 'carousel', caption: 'Before & after: Our workspace transformation 🔄', hashtags: ['#BeforeAfter', '#Transformation', '#Workspace'], platforms: ['instagram'] },
    { type: 'reel', caption: 'A day in my life as a [role] at our company', hashtags: ['#DayInMyLife', '#WorkVlog', '#CorporateLife'], platforms: ['tiktok', 'instagram'] },
    { type: 'story', caption: 'Team lunch! What we\'re eating today 🍕', hashtags: ['#TeamLunch', '#FoodAtWork', '#TeamVibes'], platforms: ['instagram'] },
    { type: 'video', caption: 'How we brainstorm new ideas — our creative process', hashtags: ['#Brainstorm', '#CreativeProcess', '#Ideas'], platforms: ['youtube', 'linkedin'] },
    { type: 'post', caption: 'Bloopers reel: Not everything goes as planned 😂', hashtags: ['#Bloopers', '#BTS', '#RealLife', '#Funny'], platforms: ['instagram', 'tiktok'] },
  ],
  'ugc': [
    { type: 'post', caption: 'We love seeing how you use our product! Keep tagging us 📸', hashtags: ['#UGC', '#CustomerSpotlight', '#TagUs'], platforms: ['instagram', 'facebook'] },
    { type: 'reel', caption: 'Customer of the month spotlight — thank you for sharing! 🌟', hashtags: ['#CustomerOfTheMonth', '#Spotlight', '#ThankYou'], platforms: ['instagram', 'tiktok'] },
    { type: 'carousel', caption: 'Your photos, your stories — a community roundup 🤝', hashtags: ['#CommunityRoundup', '#YourPhotos', '#Community'], platforms: ['instagram'] },
    { type: 'story', caption: 'Repost: Look what @customer created with our product!', hashtags: ['#Repost', '#CustomerCreation', '#Inspired'], platforms: ['instagram'] },
    { type: 'post', caption: 'Real review from a real customer: "It changed everything"', hashtags: ['#RealReview', '#Testimonial', '#HonestReview'], platforms: ['linkedin', 'facebook'] },
    { type: 'reel', caption: 'Compilation: Our favorite customer videos this month 🎬', hashtags: ['#Compilation', '#CustomerVideos', '#BestOf'], platforms: ['instagram', 'tiktok'] },
    { type: 'post', caption: 'Show us your setup! Share + tag for a chance to be featured', hashtags: ['#ShowYourSetup', '#GetFeatured', '#Community'], platforms: ['twitter', 'instagram'] },
    { type: 'video', caption: 'We surprised our top customer with a special gift 🎁', hashtags: ['#Surprise', '#CustomerLove', '#Appreciation'], platforms: ['youtube', 'tiktok'] },
    { type: 'story', caption: 'Rating our customers\' creative uses of our product 💯', hashtags: ['#Rating', '#Creative', '#CustomerUse'], platforms: ['instagram', 'tiktok'] },
  ],
  'sales': [
    { type: 'post', caption: '🔥 SALE ALERT: Up to 40% off everything — limited time only', hashtags: ['#Sale', '#Discount', '#LimitedTime', '#ShopNow'], platforms: ['instagram', 'facebook'] },
    { type: 'story', caption: 'Flash deal: Next 6 hours only ⏰ Don\'t miss out', hashtags: ['#FlashDeal', '#HurryUp', '#DealAlert'], platforms: ['instagram'] },
    { type: 'reel', caption: 'Why now is the best time to try us — here\'s the proof 📊', hashtags: ['#WhyNow', '#Proof', '#Results'], platforms: ['instagram', 'tiktok'] },
    { type: 'carousel', caption: 'Compare our plans: Which one is right for you?', hashtags: ['#Compare', '#Plans', '#ChooseYours'], platforms: ['instagram', 'linkedin'] },
    { type: 'post', caption: 'Last chance! Offer expires at midnight 🌙', hashtags: ['#LastChance', '#EndingSoon', '#MidnightDeal'], platforms: ['twitter', 'facebook'] },
    { type: 'reel', caption: 'Customer success story: How they 10x\'d their results with us', hashtags: ['#SuccessStory', '#CaseStudy', '#Results'], platforms: ['instagram', 'tiktok'] },
    { type: 'post', caption: 'Free shipping weekend! No code needed 🚚', hashtags: ['#FreeShipping', '#Weekend', '#NoCodeNeeded'], platforms: ['instagram', 'facebook'] },
    { type: 'thread', caption: 'Why 5,000+ businesses chose us (and never looked back) 🧵', hashtags: ['#WhyUs', '#Trusted', '#BusinessGrowth'], platforms: ['twitter', 'linkedin'] },
    { type: 'story', caption: 'Exclusive deal for our followers only — screenshot this! 📱', hashtags: ['#Exclusive', '#FollowerDeal', '#Secret'], platforms: ['instagram'] },
    { type: 'carousel', caption: 'ROI breakdown: What you get vs what you pay 💰', hashtags: ['#ROI', '#Value', '#Investment'], platforms: ['instagram', 'linkedin'] },
  ],
};

export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const dayNamesFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function getDaysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(month, year) {
  return new Date(year, month, 1).getDay();
}

export function getBestTimeForPlatform(platformId) {
  const p = platforms.find((pl) => pl.id === platformId);
  if (!p) return '12:00 PM';
  return p.bestTimes[Math.floor(Math.random() * p.bestTimes.length)];
}

export function getContentTypeInfo(typeId) {
  return contentTypes.find((ct) => ct.id === typeId) || contentTypes[0];
}

export function getPlatformInfo(platformId) {
  return platforms.find((p) => p.id === platformId);
}
