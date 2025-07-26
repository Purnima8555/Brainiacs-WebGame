import React, { useState, useEffect, useRef } from 'react';
import { Trophy, Star, Flame, Zap, Target, Award, Crown } from 'lucide-react';

const LeaderBoardPage = () => {
  const [period, setPeriod] = useState('weekly');
  const statRefs = useRef([]);

  const leaderboardData = {
    weekly: {
      topThree: [
        { name: 'Alex', score: 9750, avatar: <Crown className="w-8 h-8 text-yellow-500" /> },
        { name: 'Emma', score: 8540, avatar: <Star className="w-8 h-8 text-yellow-300" /> },
        { name: 'Sam', score: 7890, avatar: <Zap className="w-8 h-8 text-blue-500" /> }
      ],
      others: [
        { name: 'Maya', score: 7234, level: 'Level 12 • Math Master', avatar: <Target className="w-6 h-6 text-red-500" /> },
        { name: 'Lucas', score: 6987, level: 'Level 11 • Science Whiz', avatar: <Flame className="w-6 h-6 text-orange-500" /> },
        { name: 'Zoe', score: 6745, level: 'Level 10 • Word Wizard', avatar: <Award className="w-6 h-6 text-purple-500" /> },
        { name: 'Noah', score: 6432, level: 'Level 9 • Speed Learner', avatar: <Zap className="w-6 h-6 text-blue-500" /> }
      ]
    },
    monthly: {
      topThree: [
        { name: 'Emma', score: 34250, avatar: <Star className="w-8 h-8 text-yellow-300" /> },
        { name: 'Alex', score: 32100, avatar: <Crown className="w-8 h-8 text-yellow-500" /> },
        { name: 'Maya', score: 29890, avatar: <Target className="w-8 h-8 text-red-500" /> }
      ],
      others: [
        { name: 'Lucas', score: 28234, level: 'Level 15 • Science Whiz', avatar: <Flame className="w-6 h-6 text-orange-500" /> },
        { name: 'Sam', score: 27987, level: 'Level 14 • Explorer', avatar: <Zap className="w-6 h-6 text-blue-500" /> },
        { name: 'Zoe', score: 26745, level: 'Level 13 • Word Wizard', avatar: <Award className="w-6 h-6 text-purple-500" /> },
        { name: 'Noah', score: 25432, level: 'Level 12 • Speed Learner', avatar: <Zap className="w-6 h-6 text-blue-500" /> }
      ]
    },
    'all-time': {
      topThree: [
        { name: 'Maya', score: 156750, avatar: <Target className="w-8 h-8 text-red-500" /> },
        { name: 'Emma', score: 145200, avatar: <Star className="w-8 h-8 text-yellow-300" /> },
        { name: 'Alex', score: 142100, avatar: <Crown className="w-8 h-8 text-yellow-500" /> }
      ],
      others: [
        { name: 'Lucas', score: 138234, level: 'Level 25 • Science Master', avatar: <Flame className="w-6 h-6 text-orange-500" /> },
        { name: 'Sam', score: 135987, level: 'Level 24 • Explorer', avatar: <Zap className="w-6 h-6 text-blue-500" /> },
        { name: 'Zoe', score: 132745, level: 'Level 23 • Word Master', avatar: <Award className="w-6 h-6 text-purple-500" /> },
        { name: 'Noah', score: 129432, level: 'Level 22 • Speed Master', avatar: <Zap className="w-6 h-6 text-blue-500" /> }
      ]
    }
  };

  // Animated number counting effect
  useEffect(() => {
    const numbers = statRefs.current;
    numbers.forEach((number, index) => {
      if (!number) return;
      const final = parseInt(number.textContent.replace(/,/g, ''));
      let current = 0;
      const increment = final / 50;

      const counter = setInterval(() => {
        current += increment;
        if (current >= final) {
          number.textContent = final.toLocaleString();
          clearInterval(counter);
        } else {
          number.textContent = Math.floor(current).toLocaleString();
        }
      }, 30);
    });

    return () => numbers.forEach((_, index) => clearInterval(index));
  }, []);

  const switchPeriod = (newPeriod) => {
    setPeriod(newPeriod);
  };

  const handleClickAnimation = (e) => {
    const element = e.currentTarget;
    element.style.transform = 'scale(0.95)';
    setTimeout(() => {
      element.style.transform = '';
    }, 100);
  };

  return (
    <>
      <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
        @keyframes rotate {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(10deg); }
          50% { transform: rotate(0deg); }
          75% { transform: rotate(-10deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        @keyframes shine {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
      <div className="min-h-screen bg-gradient-to-br from-[#667eea] to-[#764ba2] font-[Comic_Sans_MS, cursive] overflow-x-hidden p-5">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10 text-white drop-shadow-md">
            <div className="flex justify-center items-center gap-5 mb-7.5">
              <Trophy className="text-5xl animate-[rotate_3s_ease-in-out_infinite]" />
              <div>
                <h1 className="text-5xl font-bold mb-2.5 animate-bounce">Learning Champions</h1>
                <p className="text-lg opacity-90">Compete, Learn, and Win Amazing Rewards!</p>
              </div>
              <Trophy className="text-5xl animate-[rotate_3s_ease-in-out_infinite]" />
            </div>
          </div>

          {/* Stats Bar */}
          <div className="flex justify-around bg-white/90 rounded-2xl p-5 mb-7.5 backdrop-blur-sm">
            {[
              { number: 1247, label: 'Total Players' },
              { number: 89, label: 'Active Today' },
              { number: 156, label: 'Achievements Unlocked' },
              { number: 2340, label: 'Points Earned' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <span
                  className="block text-2xl font-bold text-[#FF6B6B]"
                  ref={(el) => (statRefs.current[index] = el)}
                >
                  {stat.number.toLocaleString()}
                </span>
                <span className="text-sm text-gray-600">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Period Selector */}
          <div className="flex justify-center gap-5 mb-7.5">
            {['weekly', 'monthly', 'all-time'].map((p) => (
              <button
                key={p}
                onClick={() => switchPeriod(p)}
                className={`px-6 py-3 bg-white/20 border-2 border-white/30 rounded-full text-white font-bold text-base transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
                  period === p ? 'bg-white/30 border-yellow-400 shadow-[0_0_20px_rgba(255,215,0,0.5)]' : ''
                }`}
              >
                {p === 'weekly' && '🏃‍♂ Weekly'}
                {p === 'monthly' && '📅 Monthly'}
                {p === 'all-time' && '⭐ All Time'}
              </button>
            ))}
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7.5 mb-7.5">
            {/* Leaderboard Section */}
            <div className="bg-white/95 rounded-2xl p-7.5 shadow-2xl backdrop-blur-sm">
              <h2 className="text-center text-2xl font-bold text-gray-800 mb-5 relative after:content-[''] after:absolute after:bottom-[-10px] after:left-1/2 after:-translate-x-1/2 after:w-12 after:h-1 after:bg-gradient-to-r after:from-[#FF6B6B] after:to-[#4ECDC4] after:rounded">
                🏆 Top Champions
              </h2>
              <div className="flex justify-around items-end mb-7.5 h-48">
                {[2, 1, 3].map((rank, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center cursor-pointer transition-transform duration-300 hover:scale-105 rank-${rank}`}
                    onClick={handleClickAnimation}
                  >
                    <div
                      className={`w-15 h-15 rounded-full flex items-center justify-center text-white font-bold text-lg animate-pulse ${
                        rank === 1 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
                        rank === 2 ? 'bg-gradient-to-r from-gray-400 to-gray-500' :
                        'bg-gradient-to-r from-amber-700 to-amber-800'
                      } mb-2.5`}
                    >
                      {rank}
                    </div>
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] flex items-center justify-center text-white text-2xl mb-2.5 relative overflow-hidden after:content-[''] after:absolute after:top-[-50%] after:left-[-50%] after:w-[200%] after:h-[200%] after:bg-[conic-gradient(from_0deg,transparent,rgba(255,255,255,0.3),transparent)] after:animate-[shine_3s_linear_infinite]">
                      {leaderboardData[period].topThree[index].avatar}
                    </div>
                    <div className="font-bold text-gray-800 mb-1">{leaderboardData[period].topThree[index].name}</div>
                    <div className="text-gray-600 text-sm">{leaderboardData[period].topThree[index].score.toLocaleString()} pts</div>
                    <div
                      className={`w-20 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-t-lg mt-2.5 ${
                        rank === 1 ? 'h-15' : rank === 2 ? 'h-10' : 'h-5'
                      }`}
                    ></div>
                  </div>
                ))}
              </div>
              <div className="mt-5">
                {leaderboardData[period].others.map((player, index) => (
                  <div
                    key={index}
                    className="flex items-center p-4 mb-2.5 bg-white/70 rounded-xl transition-all duration-300 cursor-pointer hover:translate-x-1 hover:shadow-md relative before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-[#FF6B6B] before:to-[#4ECDC4]"
                    onClick={handleClickAnimation}
                  >
                    <div className="text-lg font-bold text-gray-800 mr-3.5 w-7.5 text-center">{index + 4}</div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] flex items-center justify-center text-white font-bold mr-3.5">
                      {player.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-gray-800">{player.name}</div>
                      <div className="text-sm text-gray-600">{player.level}</div>
                    </div>
                    <div className="text-base font-bold text-[#FF6B6B]">{player.score.toLocaleString()} pts</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements Section */}
            <div className="bg-white/95 rounded-2xl p-7.5 shadow-2xl backdrop-blur-sm">
              <h2 className="text-center text-2xl font-bold text-gray-800 mb-5 relative after:content-[''] after:absolute after:bottom-[-10px] after:left-1/2 after:-translate-x-1/2 after:w-12 after:h-1 after:bg-gradient-to-r after:from-[#FF6B6B] after:to-[#4ECDC4] after:rounded">
                🎖 Achievement Showcase
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-7.5">
                {[
                  { icon: <Trophy className="w-12 h-12" />, title: 'Top Scorer', desc: 'Highest score this week', winner: 'Alex - 9,750 pts' },
                  { icon: <Flame className="w-12 h-12" />, title: 'Streak Master', desc: '7-day learning streak', winner: 'Emma - 12 days' },
                  { icon: <Zap className="w-12 h-12" />, title: 'Speed Demon', desc: 'Fastest completion time', winner: 'Lucas - 45 sec' },
                  { icon: <Target className="w-12 h-12" />, title: 'Perfect Score', desc: '100% accuracy champion', winner: 'Maya - 5 perfect' },
                  { icon: <Award className="w-12 h-12" />, title: 'Most Improved', desc: 'Biggest score increase', winner: 'Sam - +2,340 pts' },
                  { icon: <Star className="w-12 h-12" />, title: 'Rising Star', desc: 'New player of the week', winner: 'Zoe - Level 10' }
                ].map((achievement, index) => (
                  <div
                    key={index}
                    className="bg-white/90 rounded-xl p-5 text-center transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-lg"
                    onClick={handleClickAnimation}
                  >
                    <div className="text-5xl mb-2.5 animate-[float_3s_ease-in-out_infinite]">{achievement.icon}</div>
                    <div className="font-bold text-gray-800 mb-1">{achievement.title}</div>
                    <div className="text-sm text-gray-600 mb-2.5">{achievement.desc}</div>
                    <div className="text-[#FF6B6B] font-bold">{achievement.winner}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Rewards Section */}
          <div className="bg-white/95 rounded-2xl p-7.5 text-center shadow-2xl backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-5 relative after:content-[''] after:absolute after:bottom-[-10px] after:left-1/2 after:-translate-x-1/2 after:w-12 after:h-1 after:bg-gradient-to-r after:from-[#FF6B6B] after:to-[#4ECDC4] after:rounded">
              🎁 Weekly Rewards
            </h2>
            <p className="text-gray-600 mb-5">Earn these amazing rewards by climbing the leaderboard!</p>
            <div className="flex flex-wrap justify-center gap-2.5">
              {[
                '🥇 1st Place: 500 Coins + Premium Avatar',
                '🥈 2nd Place: 300 Coins + New Theme',
                '🥉 3rd Place: 200 Coins + Special Badge',
                '🏅 Top 10: 100 Coins + Bonus Lives',
                '🎖 Participation: 50 Coins + XP Boost'
              ].map((reward, index) => (
                <div
                  key={index}
                  className="inline-block m-2.5 px-6 py-3.5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full text-white font-bold transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-md"
                  onClick={handleClickAnimation}
                >
                  {reward}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeaderBoardPage;