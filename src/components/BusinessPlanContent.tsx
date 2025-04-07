import React from 'react';

const BusinessPlanContent = () => {
  return (
    <div className="glass-card backdrop-blur-md bg-gray-900/80 rounded-2xl p-6 border border-gray-800/50 text-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-red-500 via-[#ff0080] to-[#00dfff] bg-clip-text text-transparent">
        Authentic African Foods (AAF) - Business Plan
      </h2>

      {/* Important Links Section */}
      <div className="mb-8 p-4 bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-xl border border-blue-500/30">
        <h3 className="text-lg font-semibold mb-3 text-center text-white">Important Documents</h3>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://docs.google.com/spreadsheets/d/1YGImifh2BpGjt-0Vwp9rcDe4tWdxLw-sRcj1Fyjxkas/edit?gid=355779422#gid=355779422"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-colors shadow-lg flex items-center justify-center w-full sm:w-auto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            View Financial Projections
          </a>
          <a
            href="https://docs.google.com/document/d/1sVnYLEHCV5V-yfd8x7w3ySsBkd34urEWBfrwVfs5WU8/edit?tab=t.0#heading=h.yvf7gwy4sm1u"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-colors shadow-lg flex items-center justify-center w-full sm:w-auto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
            View Founder's Resume
          </a>
        </div>
      </div>

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
          <p className="mb-4">
            An estimated $9,000 has been budgeted as start-up fund. This capital is going to be raised through personal savings, family members, and an acquisition of a small business loan.
          </p>
          <p>
            For detailed financial projections, please view our <a href="https://docs.google.com/spreadsheets/d/1YGImifh2BpGjt-0Vwp9rcDe4tWdxLw-sRcj1Fyjxkas/edit?gid=355779422#gid=355779422" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 underline font-medium">complete financial analysis</a> including startup costs, revenue forecasts, and projected profit margins.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3 text-white">1.14 Conclusion</h3>
          <p>
            Authentic African Foods (aafricanfood.netlify.app) represents more than just a business idea. It is a passion project aimed at enriching the culinary landscape of Prince George with the authentic, heartfelt flavours of Africa. This business plan details a careful, phased approach, starting lean with a home-based model to build a foundation, prove the concept, and generate initial profits, before embarking on the exciting expansion into a physical restaurant space.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3 text-white">Appendix</h3>
          <ol className="list-decimal pl-6 space-y-3">
            <li>
              <strong className="text-white">Key contacts:</strong>
              <p className="mt-1">Hardy Yusif<br />(250) 301-3828<br />authenticafricanfoods@company.ca<br />aafricanfood.netlify.app</p>
            </li>
            <li>
              <strong className="text-white">Definition of technical terms:</strong>
              <ul className="list-disc pl-6 mt-1 space-y-1">
                <li>Fufu is traditional staple food in Ghana made from boiled cassava with plantain or yam or cocoyam. In Ghana it is served with soup.</li>
                <li>Wakye is popular dish in Ghana made from beans and rice cooked together. Usually served with fried fish, boiled eggs, and pepper sauce called shito.</li>
              </ul>
            </li>
            <li>
              <strong className="text-white">Resume of key management Personnel:</strong>
              <p className="mt-1">You can view the founder's detailed resume <a href="https://docs.google.com/document/d/1sVnYLEHCV5V-yfd8x7w3ySsBkd34urEWBfrwVfs5WU8/edit?tab=t.0#heading=h.yvf7gwy4sm1u" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline font-medium">here</a>.</p>
            </li>
          </ol>
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
