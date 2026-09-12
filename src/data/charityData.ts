export interface CharityCause {
  title: string;
  category: string;
  description: string;
  badge: string;
  iconName: 'heart' | 'wheelchair' | 'users' | 'sparkles' | 'briefcase';
}

export const CHARITY_MESSAGE = {
  title: "Why Giving Back Has Always Mattered",
  author: "Frankie Fernando",
  role: "Founder, Frankie's @ the Beach Ramsgate",
  location: "Ramsgate Main Sands, Kent",
  foundation: "Share A Little Love Foundation",

  leadQuote:
    "\"Whenever I see someone struggling today, I don't look down on them. I think, 'There but for the grace of God go I.' And if I am in a position to help, then I will. That's not a marketing strategy. That's just me.\"",

  paragraphs: [
    "The truth is, giving back to people and supporting charities is not something I have suddenly discovered since opening in Ramsgate. It has been part of my life and my businesses for many years, long before Frankie's at the Beach Ramsgate ever existed.",
    "I have always believed that if you are fortunate enough to build a successful business, you should never forget the people and communities around you. For me, business has never been just about making money. It has always been about people, relationships, providing opportunities, supporting local communities and, whenever I can, helping someone who needs it.",
    "There is also a much more personal reason why helping people has always been important to me. I came from a very poor background. My mum brought us up on her own, and my father was, quite simply, no good. My mum struggled enormously, not just financially but because of the way she was treated. Eventually, when I was 12 years old, the pressure and everything she had been through became so much that she ended up in a mental institution.",
    "I don't say that to ask for sympathy, and I certainly don't want to paint myself as a victim. Quite the opposite. Growing up like that taught me very early what poverty feels like. I know what it is like to go without. I know what it is like when there isn't enough money, when things other children take for granted simply aren't available to you, and when you see someone you love struggling and there isn't much you can do about it.",
    "Those experiences have stayed with me throughout my life. But I made a decision a long time ago that I wasn't going to become a victim of my childhood. I could have allowed my upbringing to define me, but I chose not to. I decided to crack on with life, work hard and try to break the mould. I wanted to build something different for myself and my family.",
    "That doesn't mean I have forgotten where I came from. If anything, it is probably one of the biggest reasons I have always had a soft spot for people who are struggling. When you've known what it is like to go without, you notice other people's struggles. And when you've been fortunate enough to change your own circumstances, you don't forget what it felt like before you had that opportunity.",
  ],

  decadesSectionTitle: "Decades of Community Support",
  decadesParagraphs: [
    "My working life started many years ago, long before the Frankie's name became associated with beaches, burgers and ice cream. I have worked in retail, menswear, cars, street trading and ice cream, and throughout those years I have always tried to help charities and individuals where I could. In fact, my involvement in fundraising goes back decades.",
    "My charitable work has included supporting children, families, community groups, sporting events and people with disabilities. Through the years, I have helped provide days out for children, supported children's clubs, helped with specialist equipment, including a wheelchair for a child with cerebral palsy, and supported charities including Porchlight and Pilgrims Hospices.",
    "I also established the Share A Little Love Foundation because I wanted to be able to help smaller charities and community causes where a relatively small amount of money can make a very big difference to someone's life.",
    "Since coming to Ramsgate, I have continued exactly the same approach. Yes, Frankie's at the Beach Ramsgate is a business. I have invested a huge amount of my own money, time and energy into it, and naturally I want it to succeed. But supporting charities is not something I am doing because I think it will make my business look good. I don't need to pretend to be charitable for publicity. Anyone who has known me for a long time, worked with me, traded alongside me or followed my businesses over the years will know that helping people has been part of who I am.",
    "Recently, we have been looking at supporting local causes in and around Ramsgate, including organisations helping children and families affected by autism. These are causes that matter to me personally, and I want Frankie's to be part of the local community rather than simply a business operating within it.",
    "I came to Ramsgate because I believe in the town and because I believe it has enormous potential. I have family connections to Thanet and have lived in the area before, so this isn't just somewhere I picked off a map. I want Frankie's at the Beach Ramsgate to be successful — but success, to me, isn't just measured by turnover or profit. If I can create jobs, give young people experience, provide families with somewhere enjoyable to visit, support local events and charities, and perhaps make a difference to someone who is having a difficult time, then I consider that part of being successful too.",
    "My charitable work did not start when I opened Frankie's at the Beach Ramsgate. It started many years ago. Frankie's simply gives me another platform through which I can continue doing something I have always believed in.",
    "I know what it is like to have very little. I know what it is like to watch your family struggle. And perhaps most importantly, I know that where you start in life doesn't have to determine where you end up. I refused to let my childhood become an excuse. I chose to crack on, work hard, break the mould and build something better. But I never forgot where I came from.",
  ],

  closingQuote:
    "\"That's probably why, whenever I see someone struggling today, I don't look down on them. I think, 'There but for the grace of God go I.' And if I am in a position to help, then I will. That's not a marketing strategy. That's just me.\"",

  causes: [
    {
      title: "Share A Little Love Foundation",
      category: "Foundation Founded by Frankie",
      badge: "Grassroots Grantmaking",
      description:
        "Established by Frankie Fernando to provide targeted financial grants to smaller charities and grassroots community causes where a relatively small amount makes an enormous difference to someone's life.",
      iconName: "heart",
    },
    {
      title: "Specialist Equipment & Days Out",
      category: "Children & Disability Support",
      badge: "Direct Impact",
      description:
        "Funded essential specialist medical equipment including a bespoke wheelchair for a child with cerebral palsy, supported local youth clubs, and organized memorable seaside days out for underprivileged children.",
      iconName: "wheelchair",
    },
    {
      title: "Porchlight & Pilgrims Hospices",
      category: "Kent Healthcare & Homelessness",
      badge: "Long-standing Support",
      description:
        "Decades of consistent fundraising and donations to Kent's leading homelessness charity Porchlight and compassionate palliative care teams at Pilgrims Hospices.",
      iconName: "users",
    },
    {
      title: "Autism Support in Thanet & Ramsgate",
      category: "Local Thanet Initiatives",
      badge: "Personal Commitment",
      description:
        "Actively working alongside community organisations in and around Ramsgate that help children and families affected by autism, creating welcoming spaces and community backing.",
      iconName: "sparkles",
    },
    {
      title: "Youth Jobs & Mentorship in Ramsgate",
      category: "Local Economy & Opportunity",
      badge: "Investing in People",
      description:
        "Creating genuine employment opportunities, mentoring local young people entering the workforce, and investing private capital into Ramsgate's seafront future.",
      iconName: "briefcase",
    },
  ],
};
