import React from 'react';
import PagingComponent from 'components/PagingComponent';

const KBMSFeatures = () => (
  <PagingComponent>
    <div className="kbms-features__item">
      <div className="kbms-features__item__container">
        <div className="kbms-features__item__logo"><img src="/assets/svg/kbms-storage.svg" alt="Scalable Storage" /></div>
        <span className="kbms-features__item__header">Scalabale Storage</span>   
        <span className="kbms-features__item__text">A scalable system designed to be partitioned and replicated over a network of distributed machines working together</span>          
      </div>
    </div>
    <div className="kbms-features__item">
      <div className="kbms-features__item__container">
        <div className="kbms-features__item__logo"><img src="/assets/svg/kbms-elastic.svg" alt="Elastic Throughput" /></div>
        <span className="kbms-features__item__header">Elastic throughput</span>         
        <span className="kbms-features__item__text">Read and write throughput scales linearly as new machines are added to the Grakn cluster, without  any downtime</span>                    
      </div>
    </div>
    <div className="kbms-features__item">
      <div className="kbms-features__item__container">
        <div className="kbms-features__item__logo"><img src="/assets/svg/kbms-schema.svg" alt="Extensible Schema" /></div>
        <span className="kbms-features__item__header">Extensible Schema</span>                  
        <span className="kbms-features__item__text">Schema definition can be updated and extended flexibly, during runtime, without any need for database migration</span>                       
      </div>
    </div>
    <div className="kbms-features__item">
      <div className="kbms-features__item__container">
        <div className="kbms-features__item__logo"><img src="/assets/svg/kbms-secured.svg" alt="Secured Authentication" /></div>
        <span className="kbms-features__item__header">Secured Authentication</span>                  
        <span className="kbms-features__item__text">Ensuring authenticated access and also only appropriately privileged users are allowed to access specific datasets</span>                       
      </div>
    </div>
    <div className="kbms-features__item">
      <div className="kbms-features__item__container">
        <div className="kbms-features__item__logo"><img src="/assets/svg/kbms-search.svg" alt="Full-text Search" /></div>
        <span className="kbms-features__item__header">Full-text Search</span>
        <span className="kbms-features__item__text">Advanced full-text search capabilities, by enabling powerful string matching techniques over any body of text</span>
      </div>
    </div>
    <div className="kbms-features__item">
      <div className="kbms-features__item__container">
        <div className="kbms-features__item__logo"><img src="/assets/svg/kbms-tools.svg" alt="Migration Tools" /></div>
        <span className="kbms-features__item__header">Migration Tools</span>                  
        <span className="kbms-features__item__text">Tools to help migrate large datasets from various formats and database sources, easily and quickly</span>                       
      </div>
    </div>       
    <div className="kbms-features__item">
      <div className="kbms-features__item__container">
        <div className="kbms-features__item__logo"><img src="/assets/svg/kbms-IDE.svg" alt="Dedicated IDE" /></div>
        <span className="kbms-features__item__header">Dedicated IDE</span>                  
        <span className="kbms-features__item__text">An integrated development environment for knowledge engineering and modelling at scale</span>                       
      </div>
    </div>       
    <div className="kbms-features__item">
      <div className="kbms-features__item__container">
        <div className="kbms-features__item__logo"><img src="/assets/svg/kbms-performance.svg" alt="Performance Monitoring" /></div>
        <span className="kbms-features__item__header">Monitoring</span>                  
        <span className="kbms-features__item__text">Monitor your database performance in real-time through a dedicated and configurable dashboard</span>                       
      </div>
    </div>       
    <div className="kbms-features__item">
      <div className="kbms-features__item__container">
        <div className="kbms-features__item__logo"><img src="/assets/svg/kbms-cluster.svg" alt="Cluster Management" /></div>
        <span className="kbms-features__item__header">Cluster Management</span>                  
        <span className="kbms-features__item__text">Easily deploy and scale your database with tools that automate the provisioning of your cluster</span>                       
      </div>
    </div>       
  </PagingComponent>
);

export default KBMSFeatures;