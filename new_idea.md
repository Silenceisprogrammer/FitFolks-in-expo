<h1>Motivation Quote</h1>
<p>users will get get daily motivation quote to workout on th3e expo notifications .(read the expo-notifications docs I heard that it is changed)
<h1>Community of the Fitfolks</h1>
<p>Add Discord icon , Whatsapp channel icon (I will later update the links.)</p>
<h1>Reimagine the Workout channel</h1>
<p>In the workout channel categorize the activities by squat(by reps), pushups(by reps) ,plank(by timer).</p>
<p>For every workout attach the tutorial video of the activities from the youtube(embed) such that user don't have to leave the app to watch the video.</p>
<p>For posture tracking, If anybody is doing incorrect posture , add a red filter to the screen. If he continues incorrectly stop the workout and don't add the exp to the levels.</p>
<p>Reimagine the Injury risk flagging</p>
<h1>Localised Nutrituin Engine</h1>
<p>A diet recommendation system and tracking system which is designed on the Indian nutritional guidelines.</p>
<p>Odia Cuisine includes Millet based dishes , Mix Veg curry , Pakhala.</p>
<p>Track user's location and track the local market prices in the govt. databases to recommend the correct diet for the user.</p>
<p>meal photo logging - it is very important feature (I updated it to lens.google.com but it is not working properly I want it to directly open the google lens not their website, recheck it 2 times atleast.)After the meal recognisation extract the information of the food item and show their nutrional values.And rate them in the form of grade (A-F)</p>
<h1>Gamification layer</h1>
<p>Heritage challenges -Step tracking gamified. For this you can use the user's step counter achivements .For example , if he hits 20,000 steps add a achievment"Konark to Girnar Hill" to his profile.Add these types of Step counter achievements and some workout achievements around 100 achievements.Display it in Achivement page of the dashboard. To check the progress of the future achivements he can go to the Achievments page.Do not add those emojis as the logos of the achievements.Generate the achievement page like a minecraft achievement page. Most importantly , give the users local merchant or digital stores discount coupons(dummy for now) as reward.</p>
<h1>Social leaderboards
<p> For now add bhubaneswar region , berhampur region and bhawanipathna region.
Add some popular colleges of them and the hostels.</p>
<p>In the bhawanipatna, add GCEK bhawanipatna college , and their hostels are VHR,APJ and MTHR.</p>
<p>Add the leaderboard data to the database (supabase) for real time updation.</p>
<p>Add OpenStreetMap as the mapline of the daily workout session.Mark the path accordingly.Rules for the path-The path should be in the region of the user such that he can start from his home to a nearby local park, garden , running parks and city outdoors to connect with the world.</p>
<h1>Progress</h1>
<h2>Monthly Reports</h2>
<p>Exportable summary of fitness and nutrition trends , useful instints and personal tracking in the form of pdf(for brief explanation),png or jpeg(For flexing in social medias).</p>
<h2>Adaptive Difficulty</h2>
<p>Workout and step challenge targets adjust gradully based on user's trend.</p>
<h1>Relevent Databases</h1>
<p>Full "AI coach" experience? → Both: Kinetics classifies the action, COCO checks the form.
Practical note: Kinetics-400 contains some exercise-related classes (e.g., "doing push ups", "squatting", "jumping jacks"), but the coverage is thin — only a handful of the 400 classes are fitness-specific. For production fitness apps, you'd typically fine-tune a Kinetics-pretrained model on a smaller, exercise-specific dataset (e.g., NTU-RGB+D, or your own labeled workout videos) to get reliable classification across 50–200 exercise types.</p>
<p>Check if OpenStreetMap is working and can give paths for the workout for local based challenge.</p>
<h1>Evaluation Focus</h1>
<p>AI performance</p>
<p>localised nutrition database to generic calorie trackers.</p>
<p>Injury-prevention flagging</p>
<p>user engagement design ->Challenges
->Leaderboards</p>
<p>Accesobility-Give buttons for the language (for ex:-button('English),button("hindi(in hindi)),button("odia'(in odia)))</p>
<p>Retention sustainabilty- adaptive difficulty according to the user's performance and if user selected only 3days per week so give him workout for three days only and for the rest of the days just give him nutritional activity guidance.</p>



