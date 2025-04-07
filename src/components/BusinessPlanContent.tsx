import React from 'react';

const BusinessPlanContent = () => {
  return (
    <div className="glass-card backdrop-blur-md bg-gray-900/80 rounded-2xl p-6 border border-gray-800/50 text-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-red-500 via-[#ff0080] to-[#00dfff] bg-clip-text text-transparent">
        Authentic African Foods (AAF) - Business Plan
      </h2>
      
      <div className="space-y-6">
        <section>
          <h3 className="text-xl font-semibold mb-3 text-white">1.0 EXECUTIVE SUMMARY</h3>
          <p className="mb-4">
            Authentic African Food (AFF) is the embodiment of the African passion and enthusiasm for sharing the authentic, vibrant flavors of indigenous African cuisine with the community of Prince George, British Columbia. This business plan details the strategy to establish AAF as the premier destination for African food in Northern BC starting with a focused home-based operation and building towards a full-service restaurant.
          </p>
          <p>
            AAF would be launched from home kitchen, fully licensed and approved by Northern Health with an initial focus on delivery and scheduled pick-up model. This lean approach will provide valuable market feedback, perfect AAF's offerings and build a loyal following through the company website (<a href="https://aafricanfood.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">aafricanfood.netlify.app</a>) and targeted local outreach, while minimizing initial financial risk.
          </p>
        </section>
        
        <section>
          <h3 className="text-xl font-semibold mb-3 text-white">1.1 Business Description and History</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>The name of the business is Authentic African Foods (AAF), a home-based food business dedicated to sharing the vibrant, authentic flavors of indigenous African cuisine with the residents of Prince George, British Columbia.</li>
            <li>Vision statement: The vision of AAF is to build on knowledge in African cuisine to become the premier authentic African restaurant in British Columbia and to be among the top four (4) in Canada.</li>
            <li>The mission of AAF is to create a successful business in BC by selling original quality traditional Ghanaian and African dishes in BC. Authentic African Foods (AAF) strives to introduce British Columbians to African culture through food to enhance the good relations between Canadians and Ghanaians.</li>
            <li>Core values and business culture: Authenticity, quality, community, customer-centric approach, cultural representation, sustainability, and culture of excellence that is striving to be the best and continuously improve the restaurant's reputation for African cuisine and culture.</li>
          </ul>
        </section>
        
        <section>
          <h3 className="text-xl font-semibold mb-3 text-white">1.3 Product or Service Description</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>The key product will be Fufu, the heartbeat of the menu. Variations of this staple food will be available – cassava fufu, plantain fufu, yam fufu, and cocoyam fufu. These fufu variants would come with signature soups such as peanut butter soup, light soup, palm nut soup, 'egusi' soup, and okra soup.</li>
            <li>To broaden the appeal, AAF will have an expanded menu of other well-known and loved dishes including but not limited to Jollof rice, Waakye, grilled fish, sides and extras (fried plantain, Ghanaian salad, 'shito' – pepper sauce, etc.)</li>
          </ul>
        </section>
        
        <section>
          <h3 className="text-xl font-semibold mb-3 text-white">1.5 Market Plan</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>The primary target audience is the African Diaspora community. This includes individuals and families who have immigrated from various African nations, international students, temporary workers, and professionals.</li>
            <li>The secondary focus is the University of Northern British Columbia (UNBC) community. UNBC has approximately 4,000 students, faculty, and staff.</li>
            <li>Tertiary focus group include culinary adventurers and local residents. This is a broader segment of Prince George residents interested in food, trying new restaurants, exploring different cultures through cuisine, or simply looking for delicious, hearty takeaway meals.</li>
          </ul>
        </section>
        
        <section>
          <h3 className="text-xl font-semibold mb-3 text-white">1.13 Financial Data and Projection</h3>
          <p>
            An estimated $9,000 has been budgeted as start-up fund. This capital is going to be raised through personal savings, family members, and an acquisition of a small business loan.
          </p>
        </section>
        
        <section>
          <h3 className="text-xl font-semibold mb-3 text-white">1.14 Conclusion</h3>
          <p>
            Authentic African Foods (aafricanfood.netlify.app) represents more than just a business idea. It is a passion project aimed at enriching the culinary landscape of Prince George with the authentic, heartfelt flavours of Africa. This business plan details a careful, phased approach, starting lean with a home-based model to build a foundation, prove the concept, and generate initial profits, before embarking on the exciting expansion into a physical restaurant space.
          </p>
        </section>
        
        <div className="mt-6 text-center">
          <a 
            href="https://aafricanfood.netlify.app/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-block px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full hover:from-red-700 hover:to-red-800 transition-colors shadow-lg"
          >
            Visit Our Website
          </a>
        </div>
      </div>
    </div>
  );
};

export default BusinessPlanContent;
